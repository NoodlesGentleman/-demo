/**
 * Created by slipkinem on 3/1/2018 at 3:22 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from "../../../ext-nb";
import MainComponent from "../../../components/main";
import QueryForm, { Params } from "../../../components/main/model/Form";
import { assert } from "../../../shared/util/logger";
import * as _ from "lodash";
import { getContractType } from "../../../shared/util/service";
import ContractForm from "./dialog/ContractForm.vue";
import ContractFormInsert from "./dialog/ContractFormInsert.vue";
import ContractDownloadForm from "./dialog/ContractDownloadForm.vue";
import ContractModel from "./model/ContractModel";
import { isNumber } from "util";

@Component({
  components: {
    MainComponent,
    ContractForm,
    ContractFormInsert,
    ContractDownloadForm
  }
})
export default class Contract extends Vue {
  currentRow: Contract;
  dialogFormVisible = false;
  tabActiveWatchMain = "contract";
  dialogInsert = false;
  dialogShowDetail = false;
  dialogFormParams: ContractModel = new ContractModel();
  tabActive = "contract";
  columns = [
    {
      prop: "contractcode",
      label: "合同编号"
    },
    {
      prop: "contractname",
      label: "合同名称"
    },
    {
      prop: "contracttype",
      label: "合同类型",
      filter: "contractFilter"
    },
    {
      prop: "name",
      label: "签约方1"
    },
    {
      prop: "contractsecond",
      label: "签约方2"
    },
    {
      prop: "contractthird",
      label: "签约方3"
    },
    {
      prop: "contractdate",
      label: "合同期限"
    }
  ];

  forms: QueryForm[] = [
    {
      label: "合同编号",
      prop: "contractcode"
    },
    {
      label: "合同名称",
      prop: "contractname",
      type: "typeahead",
      remoteUrl: "/getContractByName",
      typeaheadProp: {
        value: "contractname",
        label: "contractname",
        query: "query"
      }
    },
    {
      label: "合同类型",
      prop: "contracttype",
      type: "select",
      options: getContractType()
    }
  ];
  contractModel: ContractModel = new ContractModel();
  $refs: {
    pkMain: MainComponent;
    ContractDownloadForm: any;
    ContractFormInsert: any;
    ContractForm: any;
  };

  async mounted() {
    await this.$refs.pkMain.query();
  }

  handleQueryParams(params: Params) {
    console.log(params);
    return params;
  }

  handleCurrentRowChange(row: ContractModel) {
    this.dialogFormParams = row;
  }

  closeDialogShowDetail() {
    this.dialogShowDetail = false;
  }

  closeDialogInsert() {
    this.dialogInsert = false;
    this.$refs.pkMain.query();
  }

  closeDialogFormVisible() {
    this.dialogFormVisible = false;
  }

  insert() {
    this.contractModel = new ContractModel();
    this.dialogInsert = true;
  }

  update() {
    assert(!_.isEmpty(this.dialogFormParams), "请先选择一行");
    if (this.dialogFormParams.contractdate.length > 2) {
      this.dialogFormParams.contractdate = this.dialogFormParams.contractdate.split(
        "到"
      );
    }
    this.dialogFormVisible = true;
    this.$nextTick(async () => {
      await this.$refs.ContractDownloadForm.$refs.pkMain.query();
    });
  }

  /**
   * 查看
   */
  showDetail() {
    assert(!_.isEmpty(this.dialogFormParams), "请先选择一行");
    if (this.dialogFormParams.contractdate.length > 2) {
      this.dialogFormParams.contractdate = this.dialogFormParams.contractdate.split(
        "到"
      );
    }
    this.dialogShowDetail = true;
    this.$nextTick(async () => {
      await this.$refs.ContractDownloadForm.$refs.pkMain.query();
    });
  }

  /**
   * 提交修改
   * @returns {Promise<void>}
   */
  async submitUpdate() {
    await this.$refs.ContractForm.$refs.ContractForm.validate();
    if (isNumber(this.dialogFormParams.name)) {
      this.dialogFormParams.contractfirst = this.dialogFormParams.name;
    }
    this.dialogFormParams.contractdate =
      this.dialogFormParams.contractdate[0] +
      "到" +
      this.dialogFormParams.contractdate[1];
    await this.$http.post<Contract>("/updateContract", this.dialogFormParams);
    this.dialogFormVisible = false;
    this.$refs.pkMain.query();
  }

  /**
   * 添加
   * @returns {Promise<void>}
   */
  async submitInsert() {
    await this.$refs.ContractFormInsert.$refs.ContractFormInsert.validate();
    this.contractModel.contractdate =
      this.contractModel.contractdate[0] +
      "到" +
      this.contractModel.contractdate[1];
    await this.$http.post<Contract>("/insertContract", this.contractModel);
    this.dialogInsert = false;
    this.$refs.pkMain.query();
  }
}
