import {
  Client,
  PrismaClient,
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
      if (user.Role === Roles.SELLER) result = filter === user.id_external;
      if (user.Role === Roles.SUPERVISOR) {
        const seller: Seller = await prisma.seller.findFirst({
          where: { id: filter },
        });
        result = seller.id_supervisor === user.id_external;
      }
      break;
    case 'store':
      if (user.Role === Roles.SELLER) {
        const store: Store = await prisma.store.findFirst({
          where: { id: filter },
        });
        result = store.id_seller === user.id_external;
      }
      if (user.Role === Roles.SUPERVISOR) {
        const store: Store = await prisma.store.findFirst({
          where: { id: filter },
        });
        const seller: Seller = await prisma.seller.findFirst({
          where: { id: store.id_seller },
        });
        result = seller.id_supervisor === user.id_external;
      }
      break;
    case 'client':
      if (user.Role === Roles.SELLER) {
        const client: Client = await prisma.client.findFirst({
          where: { id: filter },
        });
        const store: Store = await prisma.store.findFirst({
          where: { id_client: client.id },
        });
        result = store.id_seller === user.id_external;
      }
      if (user.Role === Roles.SUPERVISOR) {
        const client: Client = await prisma.client.findFirst({
          where: { id: filter },
        });
        const store: Store = await prisma.store.findFirst({
          where: { id_client: client.id },
        });
        const seller: Seller = await prisma.seller.findFirst({
          where: { id: store.id_seller },
        });
        result = seller.id_supervisor === user.id_external;
      }
      break;
    default:
      result = false;
  }

  prisma.$disconnect();
  return result;
}
