import { defineStore } from "pinia";
import { Service } from "@/domain/Service";
import { ServiceService } from "@/services";
import { type RequestResponse, handelRequest } from "@/utils/api";

export const useServiceStore = defineStore("service", () => {
  const getAllServices = async (): Promise<RequestResponse<Service[]>> => {
    return handelRequest(async () =>{
      const services = await ServiceService.getAllServices();
      return services.map((service) => new Service(service))}
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
