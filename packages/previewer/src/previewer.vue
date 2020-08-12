<template>
    <!-- Root element of PhotoSwipe. Must have class pswp. -->
    <div
        class="pswp vux-previewer"
        tabindex="-1"
        role="dialog"
        aria-hidden="true">
        <!-- Background of PhotoSwipe.
             It's a separate element as animating opacity is faster than rgba(). -->
        <div class="pswp__bg"></div>
        <!-- Slides wrapper with overflow:hidden. -->
        <div class="pswp__scroll-wrap">
            <!-- Container that holds slides.
              PhotoSwipe keeps only 3 of them in the DOM to save memory.
              Don't modify these 3 pswp__item elements, data is added later on. -->
            <div class="pswp__container">
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
            </div>
            <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
            <div class="pswp__ui pswp__ui--hidden">
                <div class="pswp__top-bar">
                    <!--  Controls are self-explanatory. Order can be changed. -->
                    <div class="pswp__counter"></div>
                    <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                    <button class="pswp__button pswp__button--share" title="Share"></button>
                    <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                    <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                    <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
                    <!-- element will get class pswp__preloader--active when preloader is running -->
                    <div class="pswp__preloader">
                        <div class="pswp__preloader__icn">
                            <div class="pswp__preloader__cut">
                                <div class="pswp__preloader__donut"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                    <div class="pswp__share-tooltip"></div>
                </div>
                <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
                <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
                <div class="pswp__caption">
                    <div class="pswp__caption__center"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import PhotoSwipe from 'photoswipe/dist/photoswipe'
    import UI from 'photoswipe/dist/photoswipe-ui-default'
    import 'photoswipe/dist/photoswipe.css';
    import 'photoswipe/dist/default-skin/default-skin.css';

    export default {
        data() {
            return {
                res: null,
            }
        },
        props: {
            list: {
                type: Array,
                default: () => [],
            },
            index: {
                type: Number,
                default: 0,
            },
            options: {
                type: Object,
                default: () => ({}),
            },
        },
        computed: {
            picList() {
                const list = this.res || this.list
                return list.map(src => ({
                    src,
                    w: 200,
                    h: 200,
                    autoSize: true,
                }))
            },
        },
        methods: {
            init(index) {
                const options = Object.assign({
                    history: false,
                    shareEl: false,
                    tapToClose: true,
                    fullscreenEl: false,
                    index,
                }, this.options)
                this.photoswipe = new PhotoSwipe(this.$el, UI, this.picList, options)
                this.photoswipe.listen('gettingData', (indexs, slide) => {
                    if (slide.autoSize) {
                        setTimeout(() => this.getSlideDimensions(slide), 300);
                    }
                });
                this.photoswipe.listen('imageLoadComplete', (indexs, slide) => {
                    if (slide.autoSize) {
                        this.getSlideDimensions(slide);
                    }
                });
                this.photoswipe.init()
                this.photoswipe.listen('close', () => {
                    this.res = null
                    this.$emit('on-close')
                })
            },
            show(index, list) {
                this.res = list || null
                this.init(index)
            },
            close() {
                this.photoswipe.close()
            },
            getSlideDimensions(slide) {
                if (!slide.autoSize) {
                    return;
                }

                const img = new Image();
                img.addEventListener('load', () => {
                    slide.autoSize = false;
                    slide.w = img.naturalWidth;
                    slide.h = img.naturalHeight;
                    this.photoswipe.invalidateCurrItems();
                    this.photoswipe.updateSize(true);
                })
                img.addEventListener('error', () => {
                    slide.autoSize = false;
                })
                img.src = slide.src;
            },
        },
    }
</script>


<style lang="scss" rel="stylesheet/scss" scoped>
    .vux-previewer {
        /*dialog的zindex值为2004*/
        z-index: 3000;
    }

    .pswp__bg {
        background-color: rgba(0, 0, 0, .5);
    }
</style>