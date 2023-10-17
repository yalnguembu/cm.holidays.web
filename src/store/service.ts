import { defineStore } from "pinia";
import { Service } from "@/domain/Service";
import { ServiceService } from "@/services";
import { type RequestResponse, handelRequest } from "../utils/api";

const services = [
  {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "Human Resources",
    posts: [
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        name: "Human resources manager",
        description:
          "business sector, industry, or economy. A narrower concept is human capital, the knowledge and skills which the individuals command.",
      },
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        name: "Human resources officer",
        description:
          "business sector, industry, or economy. A narrower concept is human capital, the knowledge and skills which the individuals command.",
      },
    ],
    description:
      "Is the set of people who make up the workforce of an organization, business sector, industry, or economy. A narrower concept is human capital, the knowledge and skills which the individuals command. Similar terms include manpower, labor, or personnel.",
    isActive: false,
    createdAt: "2023-09-29T10:04:20.415Z",
  },
  {
    id: "1fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "Research & Development",
    posts: [
      {
        id: "2fa85f64-5717-4562-b3fc-2c963f66afa6",
        name: "Human resources manager",
        description:
          "business sector, industry, or economy. A narrower concept is human capital, the knowledge and skills which the individuals command.",
      },
      {
        id: "5fa85f64-5717-4562-b3fc-2c963f66afa6",
        name: "Human resources officer",
        description:
          "business sector, industry, or economy. A narrower concept is human capital, the knowledge and skills which the individuals command.",
      },
    ],
    description:
      "Is the set of people who make up the workforce of an organization, business sector, industry, or economy. A narrower concept is human capital, the knowledge and skills which the individuals command. Similar terms include manpower, labor, or personnel.",
    isActive: true,
    createdAt: "2023-09-29T10:04:20.415Z",
  },
  {
    id: "2c963f66afa6-5717-4562-b3fc-2c963f66afa6",
    name: "Finance",
    posts: [
      {
        id: "3fa85f64-5717-4562-5717-2c963f66afa6",
        name: "Human resources manager",
        description:
          "business sector, industry, or economy. A narrower concept is human capital, the knowledge and skills which the individuals command.",
      },
      {
        id: "3fa85f64-4562-4562-b3fc-2c963f66afa6",
        name: "Human resources officer",
        description:
          "business sector, industry, or economy. A narrower concept is human capital, the knowledge and skills which the individuals command.",
      },
      {
        id: "3fa85f64-5717-4562-b3fc-4562",
        name: "Human resources officer",
        description:
          "business sector, industry, or economy. A narrower concept is human capital, the knowledge and skills which the individuals command.",
      },
    ],
    description: "Is the set of people who make up the workfor.",
    isActive: false,
    createdAt: "2023-09-29T10:04:20.415Z",
    updatedAt: "2023-09-29T15:04:20.415Z",
  },
  {
    id: "2c963f66afa6-5717-4562-b3fc-2c963f66afa6",
    name: "Human Resources",
    posts: [
      {
        id: "3fa85f64-2c963f66afa6-4562-b3fc-2c963f66afa6",
        name: "Human resources manager",
        description:
          "business sector, industry, or economy. A narrower concept is human capital, the knowledge and skills which the individuals command.",
      },
    ],
    description:
      "Is the , the knowledge and skills which the individuals command. Similar terms include manpower, labor, or personnel.",
    isActive: true,
    createdAt: "2023-09-29T10:04:20.415Z",
    updatedAt: "2023-09-29T15:04:20.415Z",
  },
  {
    id: "3fa85f64-4562-4562-b3fc-3fa85f64",
    name: "Commercial",
    posts: [],
    description:
      "Is the set of people who make up the workforce of an organization, Similar terms include manpower, labor, or personnel.",
    isActive: false,
    createdAt: "2023-09-29T10:04:20.415Z",
    updatedAt: "2023-09-29T15:04:20.415Z",
  },
];

export const useServiceStore = defineStore("service", () => {
  const getAllServices = async (): Promise<RequestResponse<Service[]>> => {
    return handelRequest(
      async () => services.map((service) => new Service(service)) // await ServiceService.getAllServices();
    );
  };
  const getServiceById = async (
    serviceId: string
  ): Promise<RequestResponse<Service>> => {
    return handelRequest(async () => {
      const service = await ServiceService.getServiceById({ id: serviceId });
      return new Service(service);
    });
  };

  const createService = async (
    service: Service
  ): Promise<RequestResponse<void>> => {
    return handelRequest(
      async () =>
        await ServiceService.createService({
          requestBody: service.serviceAsDTO,
        })
    );
  };

  const activateServiceById = async (
    serviceId: string
  ): Promise<RequestResponse<void>> => {
    return handelRequest(
      async () => await ServiceService.activateServiceById({ id: serviceId })
    );
  };

  const deactivateServiceById = async (
    serviceId: string
  ): Promise<RequestResponse<void>> => {
    return handelRequest(
      async () => await ServiceService.deactivateServiceById({ id: serviceId })
    );
  };

  const updateService = async (
    service: Service
  ): Promise<RequestResponse<void>> => {
    return handelRequest(
      async () =>
        await ServiceService.updateService({
          id: service.id,
          requestBody: service.serviceAsDTO,
        })
    );
  };

  return {
    getAllServices,
    getServiceById,
    createService,
    activateServiceById,
    deactivateServiceById,
    updateService,
  };
});
