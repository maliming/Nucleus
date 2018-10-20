import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import RoleAppService from '../../../services/role-app-service';

@Component
export default class CreateOrUpdateRoleModalComponent extends Vue {

    public getRoleForCreateOrUpdateOutput = {};
    public createOrUpdateRoleInput = {
        grantedPermissionIds: [],
        role: {
            id: '',
            name: '',
            isSystemDefault: false,
        } as IRoleDto,
    } as ICreateOrUpdateRoleInput;

    public errors: IErrorResponse[] = [];
    public roleAppService = new RoleAppService();

    public createOrUpdateRoleModalShown() {
        this.roleAppService.getRoleForCreateOrUpdate(this.$parent.getRoleForCreateOrUpdateInput).then((response) => {
            const result = response.content as IGetRoleForCreateOrUpdateOutput;
            this.getRoleForCreateOrUpdateOutput = result;
            this.createOrUpdateRoleInput = {
                grantedPermissionIds: result.grantedPermissionIds,
                role: result.role,
            };
        });
    }

    public onSubmit() {
        this.roleAppService.createRole(this.createOrUpdateRoleInput as ICreateOrUpdateRoleInput).then((response) => {
            if (!response.isError) {
                this.$refs.modalCreateOrUpdateRole.hide();
                this.$parent.getRoles();
            } else {
                this.errors = response.errors;
            }
        });
    }
}