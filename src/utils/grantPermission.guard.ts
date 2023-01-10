import {
  Client,
  PrismaClient,
  Purchase,
  Roles,
  Seller,
  Store,
  User,
} from '@prisma/client';

export async function grantPermission(
  object: string,
  action: string,
  filter: number,
  user: User,
): Promise<boolean> {
  console.log('testinggg');
  if (user.Role === Roles.MASTER || user.Role === Roles.MANAGER) return true;
  if (user.Role === Roles.VIEWER) return false;

  if (action === 'POST') return false;

  const prisma: PrismaClient = new PrismaClient();
  prisma.$connect();

  let result = true;

  switch (object) {
    case 'seller':
      result = await handleSellerPermission(prisma, user, filter);
      break;
    case 'store':
      result = await handleStorePermission(prisma, user, filter);
      break;
    case 'client':
      result = await handleClientPermission(prisma, user, filter);
      break;
    case 'purchase':
      result = await handlePurchasePermission(prisma, user, filter);
      break;
    default:
      result = false;
      break;
  }

  prisma.$disconnect();
  return result;
}

async function handlePurchasePermission(
  prisma: PrismaClient,
  user: User,
  filter: number,
): Promise<boolean> {
  const purchase: Purchase = await prisma.purchase.findFirst({
    where: { id: filter },
  });
  if (user.Role === Roles.SELLER) {
    return purchase.id_seller === user.id_external;
  } else if (user.Role === Roles.SUPERVISOR) {
    const seller: Seller = await prisma.seller.findFirst({
      where: { id: purchase.id_seller },
    });
    return seller.id_supervisor === user.id_external;
  }
}

async function handleClientPermission(
  prisma: PrismaClient,
  user: User,
  filter: number,
): Promise<boolean> {
  const client: Client = await prisma.client.findFirst({
    where: { id: filter },
  });
  const store: Store = await prisma.store.findFirst({
    where: { id_client: client.id },
  });
  if (user.Role === Roles.SELLER) {
    return store.id_seller === user.id_external;
  } else if (user.Role === Roles.SUPERVISOR) {
    const seller: Seller = await prisma.seller.findFirst({
      where: { id: store.id_seller },
    });
    return seller.id_supervisor === user.id_external;
  }
}

async function handleStorePermission(
  prisma: PrismaClient,
  user: User,
  filter: number,
): Promise<boolean> {
  const store: Store = await prisma.store.findFirst({
    where: { id: filter },
  });
  if (user.Role === Roles.SELLER) {
    return store.id_seller === user.id_external;
  } else if (user.Role === Roles.SUPERVISOR) {
    const seller: Seller = await prisma.seller.findFirst({
      where: { id: store.id_seller },
    });
    return seller.id_supervisor === user.id_external;
  }
}

async function handleSellerPermission(
  prisma: PrismaClient,
  user: User,
  filter: number,
): Promise<boolean> {
  if (user.Role === Roles.SELLER) return filter === user.id_external;
  if (user.Role === Roles.SUPERVISOR) {
    const seller: Seller = await prisma.seller.findFirst({
      where: { id: filter },
    });
    return seller.id_supervisor === user.id_external;
  }
}
