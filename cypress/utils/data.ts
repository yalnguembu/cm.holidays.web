export const holidays = [
  {
    id: 0,
    holidayType: "Maternite",
    startingDate: "2023-01-27",
    endingDate: "2023-01-31",
    returningDate: "2023-01-31",
    description: "I'm sick",
    createdAt: 1674721757537,
  },
  {
    id: 1,
    holidayType: "Annual",
    startingDate: "2023-06-12",
    endingDate: "2023-07-01",
    returningDate: "2023-07-03",
    description: "I will travel for skill leveling",
    createdAt: 1674748823119,
  },
];


export const services = [
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "Human Resources",
    "posts": [
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "Human resources manager",
        "description": "business sector, industry, or economy. A narrower concept is human capital, the knowledge and skills which the individuals command.",
      },
      {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "Human resources officer",
        "description": "business sector, industry, or economy. A narrower concept is human capital, the knowledge and skills which the individuals command.",
      }
    ],
    "description": "Is the set of people who make up the workforce of an organization, business sector, industry, or economy. A narrower concept is human capital, the knowledge and skills which the individuals command. Similar terms include manpower, labor, or personnel.",
    "isActive": false,
    "createdAt": "2023-09-29T10:04:20.415Z",
  },
  {
    "id": "1fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "Research & Development",
    "posts": [
      {
        "id": "2fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "Human resources manager",
        "description": "business sector, industry, or economy. A narrower concept is human capital, the knowledge and skills which the individuals command.",
      },
      {
        "id": "5fa85f64-5717-4562-b3fc-2c963f66afa6",
        "name": "Human resources officer",
        "description": "business sector, industry, or economy. A narrower concept is human capital, the knowledge and skills which the individuals command.",
      }
    ],
    "description": "Is the set of people who make up the workforce of an organization, business sector, industry, or economy. A narrower concept is human capital, the knowledge and skills which the individuals command. Similar terms include manpower, labor, or personnel.",
    "isActive": true,
    "createdAt": "2023-09-29T10:04:20.415Z",
  },
  {
    "id": "2c963f66afa6-5717-4562-b3fc-2c963f66afa6",
    "name": "Finance",
    "posts": [
      {
        "id": "3fa85f64-5717-4562-5717-2c963f66afa6",
        "name": "Human resources manager",
        "description": "business sector, industry, or economy. A narrower concept is human capital, the knowledge and skills which the individuals command.",
      },
      {
        "id": "3fa85f64-4562-4562-b3fc-2c963f66afa6",
        "name": "Human resources officer",
        "description": "business sector, industry, or economy. A narrower concept is human capital, the knowledge and skills which the individuals command.",
      },
      {
        "id": "3fa85f64-5717-4562-b3fc-4562",
        "name": "Human resources officer",
        "description": "business sector, industry, or economy. A narrower concept is human capital, the knowledge and skills which the individuals command.",
      }
    ],
    "description": "Is the set of people who make up the workfor.",
    "isActive": false,
    "createdAt": "2023-09-29T10:04:20.415Z",
    "updatedAt": "2023-09-29T15:04:20.415Z"
  },
  {
    "id": "2c963f66afa6-5717-4562-b3fc-2c963f66afa6",
    "name": "Human Resources",
    "posts": [
      {
        "id": "3fa85f64-2c963f66afa6-4562-b3fc-2c963f66afa6",
        "name": "Human resources manager",
        "description": "business sector, industry, or economy. A narrower concept is human capital, the knowledge and skills which the individuals command.",
      },
    ],
    "description": "Is the , the knowledge and skills which the individuals command. Similar terms include manpower, labor, or personnel.",
    "isActive": true,
    "createdAt": "2023-09-29T10:04:20.415Z",
    "updatedAt": "2023-09-29T15:04:20.415Z"
  },
  {
    "id": "3fa85f64-4562-4562-b3fc-3fa85f64",
    "name": "Commercial",
    "posts": [
    ],
    "description": "Is the set of people who make up the workforce of an organization, Similar terms include manpower, labor, or personnel.",
    "isActive": false,
    "createdAt": "2023-09-29T10:04:20.415Z",
    "updatedAt": "2023-09-29T15:04:20.415Z"
  },
]

export const posts = [
  {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "name": "DevOps",
    "description": "permet la coordination et la collaboration des rôles autrefois cloisonnés (développement, opérations informatiques, ingénierie qualité et sécurité) pour créer des produits plus performants et plus fiables",
    "service": services[0],
    "isActive": true,
    "createdAt": "2023-09-29T14:54:38.926Z",
    "updatedAt": "2023-09-29T14:54:38.926Z"
  },
  {
    "id": "2c963f66afa6-5717-4562-b3fc-2c963f66afa6",
    "name": "UI Designer",
    "description": "La conception d'interface utilisateur ou l'ingénierie d'interface utilisateur est la conception d'interfaces utilisateur pour des machines et des logiciels, tels que des ordinateurs, des appareils",
    "service": services[1],
    "isActive": true,
    "createdAt": "2023-09-29T14:54:38.926Z",
    "updatedAt": "2023-09-29T14:54:38.926Z"
  },
  {
    "id": "3fa85f64-5717-4562-5717-2c963f66afa6",
    "name": "Sale Manager",
    "description": "permet la coordination et la collaboration des rôles autrefois cloisonnés (développement, opérations informatiques, ingénierie qualité et sécurité) pour créer des produits plus performants et plus fiables",
    "service": services[2],
    "isActive": false,
    "createdAt": "2023-09-29T14:54:38.926Z",
    "updatedAt": "2023-09-29T14:54:38.926Z"
  },
  {
    "id": "2c963f66afa6-4562-4562-b3fc-3fa85f64",
    "name": "Comptable",
    "description": "La conception d'interface utilisateur ou l'ingénierie d'interface utilisateur est la conception d'interfaces utilisateur pour des machines et des logiciels, tels que des ordinateurs, des appareils",
    "service": services[1],
    "isActive": true,
    "createdAt": "2023-09-29T14:54:38.926Z",
    "updatedAt": "2023-09-29T14:54:38.926Z"
  },
]