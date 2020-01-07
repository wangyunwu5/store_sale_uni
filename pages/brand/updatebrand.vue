<template>
	<view class="content">
		
		<view class="input_item">
			<text>品牌名:</text>
			<input type="text" placeholder="请输入类名" />
		</view>
		<view class="level"></view>
		<view class="input_item">
			<text>品牌简介:</text>
			<textarea placeholder="请输入简介"></textarea>
		</view>
		<view class="level"></view>
		<view class="input_item">
			<text>图标:</text>
			<image @tap="chooseImage" src="../../static/img/photograph.png"></image>
			<text style="font-size: 20rpx;color: #b0b0b3;">只能上传一张图片</text>
		</view>
		<view class="brand_icon">
			<image :src="brandicon" @tap="imagepreview"></image>
		</view>
		<view class="bottom_box">
			<view class="quxiao">取消</view>
			<view class="queren">确定</view>
		</view>
	</view>
</template>

<script>
	import permision from "@/common/permission.js"
	export default {
		data() {
			return {
				p_brand_index: 0,
				brandicon: '',
			}
		},
		onUnload() {
		},
		methods: {
			chooseImage(){
				uni.chooseImage({
					count:1,
					sizeType:['compressed'],
					success:(res) =>{
						let imgFile = res.tempFilePaths[0];
						console.log("获取的文件路径为:"+imgFile);
						this.brandicon = res.tempFilePaths[0];
					}
				})
			},
			imagepreview(){
				uni.previewImage({
					urls:[this.brandicon],
				})
			}
			
		}
	}
</script>

<style>
	.level {
		height: 2rpx;
		background-color: #efeff4;
	}

	.input_item {
		min-height: 80rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 0 20rpx;
	}
	
	.input_item textarea{
		font-size: 20rpx;
		padding: 8rpx 6rpx;
	}
	.input_item image {
		width: 30rpx;
		height: 30rpx;
	}

	.input_item picker {
		font-size: 20rpx;
		color: #515151;
	}

	.brand_icon {
		height: 200rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
	}

	.brand_icon image {
		border: 1rpx solid #efeff4;
		width: 140rpx;
		height: 140rpx;
		border-radius: 10rpx;
	}

	.input_item text {
		font-size: 24rpx;
		padding: 0 20rpx;
	}

	.input_item input {
		font-size: 20rpx;
	}
	.quxiao,
	.queren {
		height: 30rpx;
		line-height: 30rpx;
		min-width: 60rpx;
		padding: 6rpx 12rpx;
		font-size: 18rpx;
		text-align: center;
		border-radius: 8rpx;
	}
	
	.quxiao {
		background-color: #efeff4;
		color: #000000;
	}
	
	.queren {
		background-color: #d81e06;
		color: #FFFFFF;
		margin-left: 50rpx;
	}

	.bottom_box {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 80rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
