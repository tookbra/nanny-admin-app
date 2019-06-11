import { Menu, Icon, Input } from "ant-design-vue";

const { Item, SubMenu } = Menu;
const { Search } = Input;

export default {
  name: "Tree",
  props: {
    dataSource: {
      type: Array,
      required: true
    },
    search: {
      type: Boolean,
      default: false
    },
    tenants: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleTitleClick(...args) {
      this.$emit("titleClick", { args });
    },

    renderSearch() {
      return (
        <Search
          placeholder="请输入部门名称"
          style="width: 100%; margin-bottom: 1rem"
        />
      );
    },
    renderIcon(icon) {
      return (icon && <Icon type={icon} />) || null;
    },
    renderMenuItem(item) {
      return (
        <Item
          key={item.key}
          {...{ on: { click: () => this.handleTitleClick(item) } }}
        >
          {item.title}
        </Item>
      );
    },
    renderItem(item) {
      return item.children
        ? this.renderSubItem(item, item.key)
        : this.renderMenuItem(item, item.key);
    },
    renderSubItem(item, key) {
      const childrenItems =
        item.children &&
        item.children.map(o => {
          return this.renderItem(o, o.key);
        });

      const title = (
        <span slot="title">
          <span>1{item.title}</span>
        </span>
      );
      return (
        <SubMenu
          key={key}
          {...{ on: { titleClick: () => this.handleTitleClick(item) } }}
        >
          {title}
          {childrenItems}
        </SubMenu>
      );
    }
  },
  render() {
    const { dataSource, search } = this.$props;

    // this.localOpenKeys = openKeys.slice(0)
    const list = dataSource.map(item => {
      return this.renderItem(item);
    });

    return (
      <div class="tree-wrapper">
        <a-select
          allowClear=""
          placeholder="请选择租户"
          style="width: 100%; margin-bottom: 1rem;"
        >
          {this.tenants.map(item => (
            <a-select-option key={item.id}>{item.tenantName}</a-select-option>
          ))}
        </a-select>
        {search ? this.renderSearch() : null}

        <Menu mode="inline" class="custom-tree">
          {list}
        </Menu>
      </div>
    );
  }
};
