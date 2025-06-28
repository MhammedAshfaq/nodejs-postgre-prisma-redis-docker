import { PrismaClient } from "@prisma/client";

export async function seedUsers(prisma: PrismaClient) {
  const users = [
    {
      name: "Ashfaq Mohammed",
      email: "ashfaq@example.com",
      password: "123456",
      Address: {
        create: [
          {
            address1: "123 Main Street",
            address2: "Near Mosque",
            city: "Kozhikode",
            state: "Kerala",
            district: "Kozhikode",
          },
        ],
      },
    },
    {
      name: "Hisana Sharafudheen",
      email: "hisana@example.com",
      password: "abcdef",
      Address: {
        create: [
          {
            address1: "456 Garden Lane",
            address2: "Opp Park",
            city: "Malappuram",
            state: "Kerala",
            district: "Malappuram",
          },
          {
            address1: "Apartment B-12",
            address2: "Sky Residency",
            city: "Kochi",
            state: "Kerala",
            district: "Ernakulam",
          },
        ],
      },
    },
    {
      name: "Afeef Kader",
      email: "afeef@example.com",
      password: "qwerty",
      Address: {
        create: [
          {
            address1: "789 Sea Road",
            address2: "Near Beach",
            city: "Kannur",
            state: "Kerala",
            district: "Kannur",
          },
        ],
      },
    },
  ];

  for (const user of users) {
    await prisma.users.create({ data: user });
  }

  console.log("✅ Multiple users seeded");
}
