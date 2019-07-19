/**
 * Created by slipkinem on 4/8/2018 at 5:27 PM.
 * Copyright © 2016, PuKang Health Maintenance Co.
 */
import { Component, Vue } from "../../ext-nb";
import { Prop } from "vue-property-decorator";
import { OptionItem } from "../../shared/util/model/OptionItem";
import { debouncePromise } from "../../shared/util/debounce-promise";
import ResPage from "../../model/ResPage";
import _ from "lodash";
import { TypeaheadProp } from "../form-builder/model/FormBuilderModel";
import { RequestMethod } from "../../enum/RequestMethod";
import { ElSelect } from "element-ui/types/select";

interface ElSelectExt extends ElSelect {
  handleQueryChange: (val: string) => void;
  selectedLabel: string;
  query: string;
}

@Component
export default class PkTypeahead extends Vue {
  $refs: {
    select: ElSelectExt;
  };
  private selectLoading = false;
  // 因为VUE无法检测联合类型，所以用null指代所有类型
  @Prop({
    default: ""
  })
  private value: never;

  @Prop({
    default: ""
  })
  private placeholder: string;

  @Prop({
    default: false
  })
  private disabled: boolean;

  @Prop({
    default: ""
  })
  private url: string;

  @Prop({
    default: () => ({
      value: "value",
      label: "label",
      query: "query"
    })
  })
  private prop: TypeaheadProp;

  @Prop({
    default: () => _.noop
  })
  private selectChange: (val: any, row?: any) => void;

  @Prop({
    default: RequestMethod.GET
  })
  private method: RequestMethod;

  @Prop()
  private remoteFormatter: (data: any) => any[];

  private options: any[] = [];

  get labelValue() {
    return this.value;
  }

  set labelValue(val: string) {
    this.$emit("input", val);
  }

  mounted() {
    this.$watch(
      "$refs.select.selectedLabel",
      _.debounce((val: string) => {
        if (val !== this.$refs.select.query) {
          this.$refs.select.handleQueryChange(val);
        }
      }, 500)
    );
  }

  /**
   * 搜索建议
   * @param {string} query
   */
  async remoteMethod(query: string) {
    if (query !== "") {
      await debouncePromise(async () => {
        this.selectLoading = true;
        const res = await this.$http.postParams<
          ResPage<OptionItem> & OptionItem[]
        >(
          this.url,
          {
            [this.prop.query]: query,
            pageNum: 1,
            pageSize: 50
          },
          {
            method: this.method
          }
        );
        this.selectLoading = false;
        this.options = _.isUndefined(res.rows) ? res : res.rows;
        if (this.remoteFormatter) {
          this.options = this.remoteFormatter(this.options);
        }
      }, 1000)();
    } else {
      this.options = [];
    }
  }

  render() {
    return (
      <el-select
        ref="select"
        disabled={this.disabled}
        clearable
        remote
        filterable
        reserve-keyword
        placeholder={this.placeholder}
        remote-method={(query: string) => this.remoteMethod(query)}
        loading={this.selectLoading}
        v-model={this.labelValue}
      >
        {this.options.map((option, optionKey) => (
          <el-option
            nativeOnClick={(e: Event) => {
              this.selectChange(this.labelValue, option);
              e.stopPropagation();
              e.preventDefault();
            }}
            value={this.prop.value ? option[this.prop.value] : option}
            key={optionKey}
            label={option[this.prop.label]}
          />
        ))}
      </el-select>
    );
  }
}
