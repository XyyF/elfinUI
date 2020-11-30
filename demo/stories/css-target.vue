<template>
  <div class="css-target-root">
    <div class="nav">
      <div class="nav-tree">
        <ul class="nav-tree-node-list">
          <li class="nav-tree-node" @click="handleClick('CSSTarget1')">
            <div class="nav-tree-node-content">
              <span class="nav-tree-node-caret-none"></span>
              <span class="nav-tree-node-label">CSSTarget1</span>
            </div>
            <div class="nav-collapse">
              <div class="nav-collapse-body" aria-hidden="false"></div>
            </div>
          </li>
          <li class="nav-tree-node" @click="handleClick('CSSTarget2')">
            <div class="nav-tree-node-content"><span
                class="nav-tree-node-caret-none"></span><span class="nav-tree-node-label">CSSTarget2</span></div>
            <div class="nav-collapse">
              <div class="nav-collapse-body" aria-hidden="false"></div>
            </div>
          </li>
          <li class="nav-tree-node" @click="handleClick('CSSTarget3')">
            <div class="nav-tree-node-content"><span
                class="nav-tree-node-caret-none"></span><span class="nav-tree-node-label">CSSTarget3</span></div>
            <div class="nav-collapse">
              <div class="nav-collapse-body" aria-hidden="false"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="content">
      <div id="CSSTarget1" class="content-target">
        开启后，在浏览器中打开 PDF 文件时会自动跳转到划词翻译的内置 PDF 阅读器。

        打开此选项后，无法在 Gmail、百度网盘等网站下载 PDF 文件的 bug 已修复。如果你仍然遇到了这个问题，可以反馈给我。
      </div>
      <div id="CSSTarget2" class="content-target">
        支持用黑 / 白名单规则控制在某些网址下是否启用网页划词。禁用了网页划词的页面在用鼠标划词后不会显示翻译按钮或翻译窗口，而且扩展图标上会有“off”字样。
      </div>
      <div id="CSSTarget3" class="content-target">
        通常情况下，你不需要手动修改黑 / 白名单规则，因为你可以在点击扩展图标后出现的弹窗中便捷的禁用 / 启用网页划词。
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(title) {
      window.location.hash = title;
    },
  },
}
</script>

<style scoped>
    .css-target-root {
      width: 900px;
      margin: 0 auto;
      display: flex;
    }

    .nav {
      flex-shrink: 0;
      margin-top: 20px;
      width: 200px;
    }

    .nav-tree {
      width: 150px;
      /* position: fixed; */
    }

    .nav-tree-node-list {
      list-style: none;
      margin: 0;
      padding-left: 0;
    }

    .nav-tree-node-content {
      cursor: pointer;
      align-items: center;
      display: flex;
      height: 30px;
      padding-right: 5px;
      width: 100%;
      padding-left: 23px;
    }

    .nav-tree-node-content:hover {
      background-color: rgba(191, 204, 214, .4);
    }

    .nav-tree-node-caret-none {
      min-width: 30px;
    }

    .nav-tree-node-label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-wrap: normal;
      flex: 1 1 auto;
      position: relative;
      user-select: none;
    }

    .nav-collapse {
      height: 0;
      overflow-y: hidden;
      transition: height .2s cubic-bezier(.4, 1, .75, .9);
    }

    .nav-collapse-body {
      transition: transform .2s cubic-bezier(.4, 1, .75, .9), -webkit-transform .2s cubic-bezier(.4, 1, .75, .9);
    }

    .content {
      padding-top: 20px;
      flex-grow: 1;
    }

    .content-target:target {
      animation: shake .4s cubic-bezier(.36,.07,.19,.97) both;
      transform: translateZ(0);
      backface-visibility: hidden;
      perspective: 1000px
    }

    .content-target {
      margin-bottom: 20px;
    }

    @keyframes shake {
      10%,90% {
        transform: translate3d(-1px,0,0)
      }

      30%,50%,70% {
        transform: translate3d(-2px,0,0)
      }

      40%,60% {
        transform: translate3d(1px,0,0)
      }
    }
</style>