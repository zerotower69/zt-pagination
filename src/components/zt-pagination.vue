<template id="pagination">
  <div :class="theme" ref="self">
    <div class="zt-pagination--component">
      <!-- 上一页 -->
      <button
        :class="[
          cur === 1
            ? 'zt-pagination--button disabled'
            : 'zt-pagination--button',
        ]"
        @click="pre()"
        :style="{
          width: WIDTH,
          height: HEIGHT,
          fontSize: TEXTSIZE,
          fontWeight: 'bold',
        }"
      >
        <alibaba-icon name="left-arrow" size="mini"></alibaba-icon>
      </button>
      <!-- 第一页 -->
      <button
        @click="changeCurrent(1)"
        :class="[
          cur === 1 ? 'active zt-pagination--button' : 'zt-pagination--button',
        ]"
        :style="{
          width: WIDTH,
          height: HEIGHT,
          fontSize: TEXTSIZE,
          fontWeight: 'bold',
        }"
      >
        1
      </button>
      <!-- 左跳跃 -->
      <button
        ref="left-skip"
        @mouseover="leftShow = true"
        @mouseleave="leftShow = false"
        v-show="SLShowing"
        :style="{
          width: WIDTH,
          height: HEIGHT,
          fontSize: TEXTSIZE,
          fontWeight: 'bold',
        }"
        class="zt-pagination--button"
      >
        <alibaba-icon
          name="zuoyi"
          :size="TEXTSIZE"
          v-if="leftShow"
          :active="true"
        ></alibaba-icon>
        <alibaba-icon name="sangedian1" :size="TEXTSIZE" v-else></alibaba-icon>
      </button>
      <!-- 中间部分 -->
      <ul ref="pager" class="zt-pagers" id="pager" v-if="pages > 2">
        <li
          @click="changeCurrent(page + 1)"
          v-show="showMiddlePage(page + 1)"
          v-for="page in pages - 2"
          :key="page"
          :id="'Page' + page"
          :class="{ active: cur === page + 1 }"
          :style="{
            width: WIDTH,
            height: HEIGHT,
            fontSize: TEXTSIZE,
            fontWeight: 'bold',
            lineHeight: HEIGHT,
          }"
        >
          {{ page + 1 }}
        </li>
      </ul>
      <!-- 右跳跃 -->
      <button
        ref="right-skip"
        @mouseover="rightShow = true"
        @mouseleave="rightShow = false"
        v-show="SRShowing"
        class="zt-pagination--button"
        :style="{
          width: WIDTH,
          height: HEIGHT,
          fontSize: TEXTSIZE,
          fontWeight: 'bold',
        }"
      >
        <alibaba-icon
          name="youyi"
          size="mini"
          v-if="rightShow"
          :active="true"
        ></alibaba-icon>
        <alibaba-icon name="sangedian1" size="mini" v-else></alibaba-icon>
      </button>
      <!-- 最后一页 -->
      <button
        v-if="pages > 1"
        @click="changeCurrent(pages)"
        :class="[
          cur === pages
            ? 'active zt-pagination--button'
            : 'zt-pagination--button',
        ]"
        :style="{
          width: WIDTH,
          height: HEIGHT,
          fontSize: TEXTSIZE,
          fontWeight: 'bold',
        }"
      >
        {{ pages }}
      </button>
      <!-- 下一页 -->
      <button
        :class="[
          cur === pages
            ? 'disabled zt-pagination--button'
            : 'allowed zt-pagination--button',
        ]"
        @click="nex()"
        :style="{
          width: WIDTH,
          height: HEIGHT,
          fontSize: TEXTSIZE,
          fontWeight: 'bold',
        }"
      >
        <alibaba-icon name="right-arrow" size="mini"></alibaba-icon>
      </button>
    </div>
  </div>
</template>

<script>
// 分页组件,
//1.实现···和>>切换,
//2.有背景色
//3.首页和尾页是固定的
import AlibabaIcon from "./alibaba-icon";
export default {
  name: "zt-pagiantion",
  components: {
    AlibabaIcon,
  },
  props: {
    /**
     * @description the all total results
     * @type number
     * @default 10
     * @requires
     */
    total: {
      type: Number,
      default: 10,
      required: true,
      validator: function (val) {
        if (val < 0) {
          throw TypeError("Wrong props the prop 'total' must >0");
        } else {
          return true;
        }
      },
    },
    /**
     * @description the current page you select
     * @type number
     * @default 1
     * @requires
     */
    current: {
      type: Number,
      default: 1,
      required: true,
    },
    /**
     * @description the max items you want to show in one page
     * @default 5
     * @type Number
     */
    limit: {
      type: Number,
      default: 5,
      required: false,
    },
    /**
     * @description the length of showing, must be odd
     * @type Number
     * @requires
     */
    showLength: {
      type: Number,
      default: 3,
      required: false,
      validator: function (val) {
        return val % 2 === 1;
      },
    },
    /**
     * @description when too many pages, you want to skip pages.
     * @default  2--pages<40  5--pages>=40&&pages<100  8--pages>100
     * @type Number
     * @requires
     */
    skipSize: {
      type: Number,
      default: 0,
      required: false,
    },
    /**
     * @description the theme style of pagination
     * @default default-theme
     * */
    theme: {
      type: String,
      default: "default-theme",
      required: false,
    },
    /**
     *
     * */
    useTheme: {
      type: Boolean,
      default: true,
      required: false,
    },
    /**
     * @description the height of the pagination component
     * */
    height: {
      type: [Number, String],
      default: 30,
      required: false,
    },
    /**
     * @description the width of the pagination component
     * */
    width: {
      type: [Number, String],
      default: 30,
      required: false,
    },
    /**
     * @description the text size you want to change to.
     **/
    textSize: {
      type: [Number, String],
      default: 16,
      required: false,
    },
  },
  data() {
    return {
      cur: this.current,
      left: 2,
      right: this.pages - 1,
      leftShow: false,
      rightShow: false,
    };
  },
  watch: {
    //  监听cur的变化
    cur(val) {
      this.computedZone();
      //   提交值给父组件
      this.$emit("changeCurrent", val);
      //赋值给外部变量
    },
  },
  created() {
    this.computedZone();
    this.$nextTick(() => {
      document.onselect = function () {
        return false;
      };
      document.onselectstart = function () {
        return false;
      };
      /*绑定跳跃事件*/
      const leftSkip = this.$refs["left-skip"];
      const that = this;
      leftSkip.onclick = function (e) {
        const dePage = that.cur - that.skip;
        if (dePage < 1) {
          that.cur = 1;
        } else {
          that.cur = dePage;
        }
      };
      const rightSkip = this.$refs["right-skip"];
      rightSkip.onclick = function (e) {
        const aePage = that.cur + that.skip;
        if (aePage > that.pages) {
          that.cur = that.pages;
        } else {
          that.cur = aePage;
        }
      };
    });
  },
  methods: {
    /**
     * @description show middle part true of false
     * */
    showMiddlePage(index) {
      return index >= this.left && index <= this.right;
    },
    // 计算可见区间的端点
    computedZone() {
      let middle = Math.ceil(this.showLength / 2);
      if (this.cur <= middle) {
        this.left = 2;
        this.right = 1 + this.showLength;
      } else if (this.cur >= this.pages - middle) {
        this.left = this.pages - this.showLength;
        this.right = this.pages - 1;
      } else {
        this.left = this.cur - (middle - 1);
        this.right = this.cur + (middle - 1);
      }
    },
    //上一页
    pre() {
      if (this.cur !== 1) {
        this.cur = this.cur - 1;
      }
    },
    //改变当前页
    changeCurrent(val) {
      this.cur = val;
    },
    //下一页
    nex() {
      if (this.cur !== this.pages) {
        this.cur = this.cur + 1;
      }
    },
    // 页数跳跃
    skipPage(e) {
      const ID = e.currentTarget.getAttribute("id");
      if (ID === "SL") {
        const dePage = this.cur - this.skip;
        if (dePage < 1) {
          this.cur = 1;
        } else {
          this.cur = dePage;
        }
      } else if (ID === "SR") {
        const aePage = this.cur + this.skip;
        if (aePage > this.pages) {
          this.cur = this.pages;
        } else {
          this.cur = aePage;
        }
      } else return;
    },
  },
  computed: {
    skip: function () {
      if (this.skipSize !== 0 && this.skipSize !== undefined)
        return this.skipSize;
      if (this.pages <= 40) {
        return 2;
      } else if (this.pages > 40 && this.pages < 100) {
        return 5;
      } else {
        return 8;
      }
    },
    // 计算页数
    pages: function () {
      return Math.ceil(this.total / this.limit);
    },
    /**
     * @return {boolean}
     */
    SLShowing: function () {
      return this.cur > this.showLength && this.left > 1;
    },
    /**
     * @return {boolean}
     */
    SRShowing: function () {
      return (
        this.cur < this.pages - this.showLength + 1 && this.right < this.pages
      );
    },
    /**
     * @return {string}
     */
    HEIGHT: function () {
      if (typeof this.height == "number") return String(this.height) + "px";
      else return this.height;
    },
    /**
     * @return {string}
     */
    WIDTH: function () {
      if (typeof this.width == "number") return String(this.width) + "px";
      else return this.width;
    },
    /**
     * @return {string}
     */
    TEXTSIZE: function () {
      if (typeof this.textSize == "number") {
        return String(this.textSize) + "px";
      } else {
        return this.textSize;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.zt-pagination--component {
  width: fit-content;
  margin: 10px auto;
  display: inline-flex;
}

.allowed {
  cursor: pointer !important;
}
.disabled {
  cursor: not-allowed !important;
}

.zt-pagers {
  list-style: none; /* 将默认的列表符号去掉 */
  padding: 0; /* 将默认的内边距去掉 */
  margin: 0; /* 将默认的外边距去掉 */
  height: 100%;
  li {
    float: left;
    height: 100%;
    margin: 0 5px;
    width: fit-content;
    text-align: center;
    align-content: center;
    justify-content: center;
    cursor: pointer;
    font-weight: bold;
    border-radius: 7px;
  }
}

.zt-pagination--button {
  border: 0;
  outline: 0;
  cursor: pointer;
  border-radius: 7px;
}
</style>


