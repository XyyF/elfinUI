/**
 * Created by gukong on 2018/4/15.
 */
import Render from './render'
import UploadImage from '../../upload/index.vue'
import '../styles/upload-image.css'

const sizeMap = {
	'big': {
		width: '300px',
		height: '150px',
	},
	'medium': {
		width: '80px',
		height: '80px',
	},
	'small': {
		width: '40px',
		height: '40px',
	}
}

// next 完善图片上传逻辑，UI 展示
export default class UploadImageRender extends Render {
	render() {
		const size = this.options.size || 'big'
		const style = sizeMap[size]

		const uploadTips = [
			this.h(
				'i',
				{
					class: 'el-icon-upload',
				},
			),
			this.h(
				'div',
				{
					class: 'el-upload__text',
				},
				[
					'将文件拖到此处，或',
					this.h(
						'em',
						'点击上传',
					),
				],
			),
			this.h(
				'div',
				{
					class: 'el-upload__tip',
					slot: 'tips',
				},
				'只能上传jpg/png文件，且不超过500kb',
			),
		]

		const imageView = [
			this.h(
				'div',
				{
					style: {
						backgroundImage: `url(${this.options.value})`,
						backgroundSize: 'cover',
						...style,
					},
				},
			),
		]

		return this.h(
			UploadImage,
			{
				...this.options,
				class: 'xjl-form-image-choice',
				style: {
					...Object.assign(style, this.options.style)
				},
			},
			this.options.value ? imageView : uploadTips,
		)
	}
}