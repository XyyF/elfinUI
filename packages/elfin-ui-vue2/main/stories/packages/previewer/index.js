/**
 * Created by rengar on 2020/4/23.
 */
import Vue from 'vue';
import {storiesOf} from '@storybook/vue';
import {withKnobs} from '@storybook/addon-knobs';
import {ElfinPreviewer} from '@packages/previewer';
import assets1 from '../../../assets/assets1.jpg';
import assets2 from '../../../assets/assets2.jpg';
import assets3 from '../../../assets/assets3.jpg';
import notes from './index.md';

Vue.use(ElfinPreviewer);

storiesOf('组件|elfinPreviewer 图片预览', module)
    .addDecorator(withKnobs)
    .add('组件介绍', () => ({
        template: `
            <div>
                <generic-container title="previewer">
                    <p slot="subDocs">
                        统一的图片预览调用方式<br/>
                        previewer以单例模式进行设计，通过Vue.use()在prototype注册实例方法$previewImages<br/>
                        在第一次使用前不会进行任何的DOM操作<br/>
                    </p>
                </generic-container>
                <generic-container title="适用场景">
                    <p slot="subDocs">
                        在图片列表中，点击图片进行预览
                    </p>
                </generic-container>
                <generic-container title="基本使用">
                    <p slot="subDocs">
                        this.$previewImages(urls, idx)<br/>
                        - urls: 图片列表<br/>
                        - idx: 默认展示第几张图片，默认下标为0<br/>
                    </p>
                    <el-button @click="handleClick">点击预览图片</el-button>
                </generic-container>
            </div>
        `,
        methods: {
            handleClick() {
                this.$previewImages([assets1, assets2, assets3]);
            },
        },
    }), {notes});
