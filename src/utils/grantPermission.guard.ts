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
  let store: Store;
  let client: Client;
  let seller: Seller;
  let purchase: Purchase;

  switch (object) {
    case 'seller':
      if (user.Role === Roles.SELLER) result = filter === user.id_external;
      if (user.Role === Roles.SUPERVISOR) {
        seller = await prisma.seller.findFirst({
          where: { id: filter },
        });
        result = seller.id_supervisor === user.id_external;
      }
      break;
    case 'store':
      store = await prisma.store.findFirst({
        where: { id: filter },
      });
      if (user.Role === Roles.SELLER) {
        result = store.id_seller === user.id_external;
      } else if (user.Role === Roles.SUPERVISOR) {
        seller = await prisma.seller.findFirst({
          where: { id: store.id_seller },
        });
        result = seller.id_supervisor === user.id_external;
      }
      break;
    case 'client':
      client = await prisma.client.findFirst({
        where: { id: filter },
      });
      store = await prisma.store.findFirst({
        where: { id_client: client.id },
      });
      if (user.Role === Roles.SELLER) {
        result = store.id_seller === user.id_external;
      } else if (user.Role === Roles.SUPERVISOR) {
        seller = await prisma.seller.findFirst({
          where: { id: store.id_seller },
        });
        result = seller.id_supervisor === user.id_external;
      }
      break;
    case 'purchase':
      purchase = await prisma.purchase.findFirst({
        where: { id: filter },
      });
      if (user.Role === Roles.SELLER) {
        result = purchase.id_seller === user.id_external;
      } else if (user.Role === Roles.SUPERVISOR) {
        seller = await prisma.seller.findFirst({
          where: { id: purchase.id_seller },
        });
        result = seller.id_supervisor === user.id_external;
      }
    default:
      result = false;
  }

  prisma.$disconnect();
  return result;
}
