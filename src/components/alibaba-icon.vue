<template>
  <svg
    :class="[active? 'icon svg-active':'icon svg-inactive']"
    aria-hidden="true"
    :style="{ fontSize: SIZE, color: color }"
    v-if="color!==undefined"
  >
    <use :xlink:href="'#icon-' + name"></use>
  </svg>
  <svg
    :class="[active? 'icon svg-active':'icon svg-inactive']"
    aria-hidden="true"
    :style="{ fontSize: SIZE}"
    v-else
  >
    <use :xlink:href="'#icon-' + name"></use>
  </svg>
</template>

  <script>
export default {
  name: "alibaba-icon",
  props: {
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
      default: undefined,
    },
    size: {
      type: [Number,String],
      required: false,
      default: "normal",
      validator: (value) => {
        const type=typeof value;
        return type==='number' ||type==='string'
      },
    },
    active:{
      type:Boolean,
      default:false,
      required:false
    }
  },
  computed: {
    /**
     * @return {string}
     */
    SIZE() {
      const value = {
        normal: 30,
        medium: 25,
        small: 20,
        mini: 15,
        large: 35,
        larger: 40,
        xLarge: 50,
        xxLarge: 70,
        xxxLarge: 80,
      };
      if (typeof this.size === "string") {
        if(value.hasOwnProperty(this.size)) return value[this.size];
        else return this.size;
      }
      else return String(this.size)+'px';
    },
  },
  methods:{
    setName(name){
      this.name=name;
    },
    getName(){
      return this.name;
    },
    setColor(color){
      this.color=color;
    }
  },
  created() {
    let parent=this;
    if(parent!==undefined){
      console.log("图标节点的父元素",parent)
    }
  }
};
</script>
