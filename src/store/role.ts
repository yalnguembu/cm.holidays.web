import { defineStore } from "pinia";
import { Role, newNullRole } from "@/domain/Role";
import { RoleService } from "@/services";
import {handelRequest, RequestResponse} from "@/utils/api";

export const useRoleStore = defineStore("role", () => {
  const getAllRoles = async (): Promise<RequestResponse<Role[]>> => {
    return handelRequest(async () => {
      const roles = await RoleService.getAllRoles();
      return roles.map((role) => new Role(role));
    });
  };
  const getRoleById = async (roleId: string): Promise<Role> => {
    try {
      const role = await RoleService.getRoleById({id:roleId});
      return new Role(role);
    } catch (error: unknown) {
      console.log(error);
      return newNullRole();
    }
  };

  const createRole = async (role: Role): Promise<void> => {
    try {
      await RoleService.createRole({requestBody: role.roleAsDTO});
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const activateRoleById = async (roleId:string): Promise<void> => {
    try {
      await RoleService.activateRoleById({id:roleId});
    } catch (error: unknown) {
      console.log(error);
    }
  }

  const deactivateRoleById = async (roleId:string): Promise<void> => {
    try {
      await RoleService.deactivateRoleById({id:roleId});
    } catch (error: unknown) {
      console.log(error);
    }
  }


  const updateRole = async (role: Role): Promise<void> => {
    try {
      await RoleService.updateRole({id: role.id, requestBody: role.roleAsDTO});
    } catch (error: unknown) {
      console.log(error);
    }
  };

  return {
    getAllRoles,
    getRoleById,
    createRole,
    activateRoleById,
    deactivateRoleById,
    updateRole
  };
});
