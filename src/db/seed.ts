import "dotenv/config";
import bcrypt from "bcryptjs";
import { db, pool } from "./index";
import { adminUsers, blogPosts, vehicleImages, vehicles } from "./schema";

const hatchImages = [
  "https://images.pexels.com/photos/18305913/pexels-photo-18305913.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
  "https://images.pexels.com/photos/17078606/pexels-photo-17078606.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
  "https://images.pexels.com/photos/33326195/pexels-photo-33326195.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
  "https://images.pexels.com/photos/10077694/pexels-photo-10077694.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
];
const sedanImages = [
  "https://images.pexels.com/photos/261985/pexels-photo-261985.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
  "https://images.pexels.com/photos/14696345/pexels-photo-14696345.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
  "https://images.pexels.com/photos/20894618/pexels-photo-20894618.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
  "https://images.pexels.com/photos/20484408/pexels-photo-20484408.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
];
const suvImages = [
  "https://images.pexels.com/photos/15188438/pexels-photo-15188438.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
  "https://images.pexels.com/photos/4257579/pexels-photo-4257579.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
  "https://images.pexels.com/photos/16180485/pexels-photo-16180485.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
  "https://images.pexels.com/photos/26572217/pexels-photo-26572217.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
];
const pickupImages = [
  "https://images.pexels.com/photos/5661743/pexels-photo-5661743.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
  "https://images.pexels.com/photos/10196543/pexels-photo-10196543.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
  "https://images.pexels.com/photos/21875976/pexels-photo-21875976.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
];

function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

type SeedVehicle = {
  brand: string;
  model: string;
  version: string;
  yearManufacture: number;
  yearModel: number;
  km: number;
  price: number;
  fuel: "flex" | "gasolina" | "diesel" | "eletrico" | "hibrido";
  transmission: "manual" | "automatico";
  color: string;
  status: "disponivel" | "reservado" | "vendido" | "preparacao";
  featured: boolean;
  images: string[];
  description: string;
};

const seedVehicles: SeedVehicle[] = [
  {
    brand: "Jeep",
    model: "Renegade",
    version: "Sport 1.8 4x2",
    yearManufacture: 2016,
    yearModel: 2016,
    km: 78000,
    price: 64900,
    fuel: "flex",
    transmission: "manual",
    color: "Branco",
    status: "disponivel",
    featured: true,
    images: suvImages.slice(0, 2),
    description: "Jeep Renegade Sport revisado, pneus novos, documentação em dia.",
  },
  {
    brand: "Chevrolet",
    model: "Onix",
    version: "1.0 Joy SPE/4",
    yearManufacture: 2019,
    yearModel: 2019,
    km: 62000,
    price: 49900,
    fuel: "flex",
    transmission: "manual",
    color: "Prata",
    status: "disponivel",
    featured: true,
    images: hatchImages.slice(0, 2),
    description: "Onix econômico, ideal para o dia a dia, único dono.",
  },
  {
    brand: "Fiat",
    model: "Strada",
    version: "Freedom 1.3 CS Plus",
    yearManufacture: 2021,
    yearModel: 2021,
    km: 41000,
    price: 73900,
    fuel: "flex",
    transmission: "manual",
    color: "Vermelho",
    status: "disponivel",
    featured: true,
    images: pickupImages.slice(0, 2),
    description: "Strada Freedom, cabine simples, pronta para o trabalho.",
  },
  {
    brand: "Chevrolet",
    model: "Prisma",
    version: "1.4 SPE/4 Eco LT",
    yearManufacture: 2019,
    yearModel: 2019,
    km: 58000,
    price: 62900,
    fuel: "flex",
    transmission: "manual",
    color: "Preto",
    status: "disponivel",
    featured: false,
    images: sedanImages.slice(0, 2),
    description: "Prisma sedan completo, excelente custo-benefício.",
  },
  {
    brand: "Honda",
    model: "Civic",
    version: "LXR 2.0 i-VTEC",
    yearManufacture: 2016,
    yearModel: 2016,
    km: 89000,
    price: 76900,
    fuel: "flex",
    transmission: "automatico",
    color: "Cinza",
    status: "disponivel",
    featured: true,
    images: sedanImages.slice(1, 3),
    description: "Civic automático, interior de couro, revisões em dia.",
  },
  {
    brand: "Jeep",
    model: "Renegade",
    version: "Longitude 1.8 4x2",
    yearManufacture: 2016,
    yearModel: 2016,
    km: 81000,
    price: 65900,
    fuel: "flex",
    transmission: "automatico",
    color: "Azul",
    status: "disponivel",
    featured: false,
    images: suvImages.slice(1, 3),
    description: "Renegade Longitude automático, completo, multimídia original.",
  },
  {
    brand: "Toyota",
    model: "Hilux",
    version: "Cabine Dupla 3.0 TDI 4x4 SRV",
    yearManufacture: 2013,
    yearModel: 2013,
    km: 152000,
    price: 126900,
    fuel: "diesel",
    transmission: "automatico",
    color: "Prata",
    status: "disponivel",
    featured: true,
    images: pickupImages.slice(1, 3),
    description: "Hilux SRV 4x4 diesel, motor de ferro fundido, revisada.",
  },
  {
    brand: "Chevrolet",
    model: "Celta",
    version: "LS 1.0",
    yearManufacture: 2013,
    yearModel: 2013,
    km: 110000,
    price: 26900,
    fuel: "flex",
    transmission: "manual",
    color: "Branco",
    status: "disponivel",
    featured: false,
    images: hatchImages.slice(1, 3),
    description: "Celta econômico, ótimo primeiro carro.",
  },
  {
    brand: "Chevrolet",
    model: "Onix",
    version: "Activ 1.4",
    yearManufacture: 2019,
    yearModel: 2019,
    km: 55000,
    price: 62900,
    fuel: "flex",
    transmission: "automatico",
    color: "Laranja",
    status: "disponivel",
    featured: false,
    images: hatchImages.slice(2, 4),
    description: "Onix Activ automático, visual aventureiro, completo.",
  },
  {
    brand: "Fiat",
    model: "Mobi",
    version: "Like",
    yearManufacture: 2025,
    yearModel: 2025,
    km: 8000,
    price: 59900,
    fuel: "flex",
    transmission: "manual",
    color: "Branco",
    status: "disponivel",
    featured: true,
    images: hatchImages.slice(0, 2),
    description: "Mobi Like seminovo, baixíssima quilometragem.",
  },
  {
    brand: "Fiat",
    model: "Strada",
    version: "Working",
    yearManufacture: 2012,
    yearModel: 2012,
    km: 160000,
    price: 53000,
    fuel: "flex",
    transmission: "manual",
    color: "Branco",
    status: "disponivel",
    featured: false,
    images: pickupImages.slice(2, 3),
    description: "Strada robusta, pronta para o trabalho pesado.",
  },
  {
    brand: "Renault",
    model: "Kwid",
    version: "1.0 Sce Intense",
    yearManufacture: 2019,
    yearModel: 2019,
    km: 48000,
    price: 46900,
    fuel: "flex",
    transmission: "manual",
    color: "Vermelho",
    status: "disponivel",
    featured: false,
    images: hatchImages.slice(0, 1),
    description: "Kwid Intense, econômico e completo.",
  },
  {
    brand: "Ford",
    model: "Ranger",
    version: "2.2 XLS 4x4 Diesel",
    yearManufacture: 2023,
    yearModel: 2023,
    km: 32000,
    price: 154900,
    fuel: "diesel",
    transmission: "automatico",
    color: "Prata",
    status: "disponivel",
    featured: true,
    images: pickupImages.slice(0, 2),
    description: "Ranger XLS 4x4 diesel automática, seminova.",
  },
  {
    brand: "Renault",
    model: "Kwid",
    version: "Zen Flex Completo",
    yearManufacture: 2023,
    yearModel: 2022,
    km: 62000,
    price: 49990,
    fuel: "flex",
    transmission: "manual",
    color: "Cinza",
    status: "disponivel",
    featured: false,
    images: hatchImages.slice(1, 2),
    description: "Kwid Zen completo, baixo km, ótimo estado.",
  },
  {
    brand: "Toyota",
    model: "Corolla",
    version: "GLI",
    yearManufacture: 2018,
    yearModel: 2018,
    km: 60000,
    price: 89900,
    fuel: "flex",
    transmission: "automatico",
    color: "Prata",
    status: "disponivel",
    featured: true,
    images: sedanImages.slice(2, 4),
    description: "Corolla GLI automático, revisado na concessionária.",
  },
  {
    brand: "Toyota",
    model: "SW4",
    version: "SRV 2.8 4x4 Diesel",
    yearManufacture: 2019,
    yearModel: 2019,
    km: 70000,
    price: 239900,
    fuel: "diesel",
    transmission: "automatico",
    color: "Preto",
    status: "disponivel",
    featured: false,
    images: suvImages.slice(2, 4),
    description: "SW4 SRV 7 lugares, 4x4 diesel, completa.",
  },
  {
    brand: "Jeep",
    model: "Compass",
    version: "Longitude T270 1.3 Turbo Flex",
    yearManufacture: 2023,
    yearModel: 2023,
    km: 25000,
    price: 139900,
    fuel: "flex",
    transmission: "automatico",
    color: "Branco",
    status: "disponivel",
    featured: true,
    images: suvImages.slice(0, 2),
    description: "Compass Longitude T270, seminova, garantia de fábrica.",
  },
  {
    brand: "Fiat",
    model: "Strada",
    version: "Freedom CD",
    yearManufacture: 2020,
    yearModel: 2019,
    km: 69000,
    price: 78900,
    fuel: "flex",
    transmission: "manual",
    color: "Cinza",
    status: "vendido",
    featured: false,
    images: pickupImages.slice(0, 1),
    description: "Strada Freedom cabine dupla, vendida recentemente.",
  },
];

const seedBlogPosts = [
  {
    title: "Como financiar seu primeiro carro sem dor de cabeça",
    excerpt:
      "Entenda o passo a passo do financiamento de veículos e como aumentar suas chances de aprovação.",
    content:
      "Financiar o primeiro carro pode parecer complicado, mas com organização fica simples. " +
      "Primeiro, simule o valor da parcela no nosso site antes de ir até a loja. " +
      "Depois, reúna seus documentos: RG, CPF, comprovante de renda e comprovante de residência. " +
      "Quanto maior a entrada, menor a parcela e maior a chance de aprovação. " +
      "Na Auto Via Veículos trabalhamos com o Santander e outras financeiras parceiras para " +
      "encontrar a melhor condição para o seu perfil. Fale com a nossa equipe e simule agora mesmo!",
    coverImage: sedanImages[1],
  },
  {
    title: "5 dicas para vender seu usado por um preço justo",
    excerpt: "Veja como preparar seu veículo antes de colocá-lo à venda ou dar na troca.",
    content:
      "1. Faça uma boa limpeza interna e externa antes da avaliação.\n" +
      "2. Reúna toda a documentação e o histórico de manutenções.\n" +
      "3. Resolva pequenos reparos estéticos, como riscos e amassados leves.\n" +
      "4. Use nossa ferramenta de avaliação online para saber a faixa de valor do seu carro.\n" +
      "5. Negocie com transparência — procedência vale mais do que preço baixo.\n\n" +
      "Na Auto Via Veículos, você pode avaliar seu carro na troca em poucos minutos, direto pelo site.",
    coverImage: hatchImages[2],
  },
  {
    title: "Manutenção preventiva: o segredo para um carro durar mais",
    excerpt: "Pequenos cuidados que evitam gastos grandes no futuro.",
    content:
      "Trocar o óleo no prazo certo, calibrar os pneus semanalmente e revisar os freios a cada " +
      "10 mil km são hábitos simples que aumentam a vida útil do seu veículo e preservam o valor " +
      "de revenda. Antes de uma viagem longa, confira o nível de fluídos e o estado dos pneus. " +
      "Se você comprou seu carro na Auto Via Veículos, conte com nossa equipe para indicar as " +
      "melhores oficinas parceiras da região.",
    coverImage: suvImages[1],
  },
];

async function main() {
  console.log("Seeding database...");

  const email = process.env.ADMIN_SEED_EMAIL ?? "admin@exemplo.com";
  const password = process.env.ADMIN_SEED_PASSWORD ?? "AutoVia-Demo-2026!";
  const passwordHash = await bcrypt.hash(password, 10);

  await db
    .insert(adminUsers)
    .values({ name: "Administrador Auto Via", email, passwordHash })
    .onConflictDoNothing({ target: adminUsers.email });

  const existingVehicles = await db.select({ id: vehicles.id }).from(vehicles);
  if (existingVehicles.length === 0) {
    for (const v of seedVehicles) {
      const slug = slugify(`${v.brand}-${v.model}-${v.version}-${v.yearModel}-${Math.floor(Math.random() * 9000 + 1000)}`);
      const [created] = await db
        .insert(vehicles)
        .values({
          slug,
          brand: v.brand,
          model: v.model,
          version: v.version,
          yearManufacture: v.yearManufacture,
          yearModel: v.yearModel,
          km: v.km,
          price: String(v.price),
          fuel: v.fuel,
          transmission: v.transmission,
          color: v.color,
          doors: 4,
          description: v.description,
          status: v.status,
          featured: v.featured,
          coverImage: v.images[0] ?? "",
          soldAt: v.status === "vendido" ? new Date() : null,
        })
        .returning({ id: vehicles.id });

      if (created && v.images.length > 0) {
        await db.insert(vehicleImages).values(
          v.images.map((url, index) => ({ vehicleId: created.id, url, position: index })),
        );
      }
    }
    console.log(`Inserted ${seedVehicles.length} vehicles.`);
  } else {
    console.log("Vehicles already seeded, skipping.");
  }

  const existingPosts = await db.select({ id: blogPosts.id }).from(blogPosts);
  if (existingPosts.length === 0) {
    for (const post of seedBlogPosts) {
      await db.insert(blogPosts).values({
        title: post.title,
        slug: slugify(post.title),
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage,
        published: true,
      });
    }
    console.log(`Inserted ${seedBlogPosts.length} blog posts.`);
  } else {
    console.log("Blog posts already seeded, skipping.");
  }

  console.log("Seed complete.");
  console.log(`Admin login -> email: ${email} / password: ${password}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
