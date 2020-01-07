<template>
	<view class="this_content">
		<view class="content_item">
			<view v-if="shopimage ==='' || shopimage ==null" class="no_image">
				<image src="../../static/img/photograph1.png"></image>
				<text>点击添加图片</text>
			</view>
			<view v-if="shopimage !='' || shopimage !=null" class="show_image" :style="{backgroundImage:`url(${shopimage})`}">
				<image src="../../static/img/photograph1.png"></image>
			</view>
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				shopimage:'../../static/img/shopimage.jpg'
			}
		}
	}
</script>
<style>
	.this_content{
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #efeff4;
	}
	.content_item{
		min-height: 100rpx;
	}
	.no_image{
		display: flex;
		height: 250rpx;
		background-color: #FAFAFA;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	.no_image>image, .show_image>image{
		height: 80rpx;
		width: 80rpx;
	}
	.no_image>text{
		font-size: 20rpx;
	}
	.show_image{
		display: flex;
		height: 250rpx;
		/* background-image: url(../../static/img/huawei_icon.jpg); */
		background-size: 100% 100%;
		background-repeat: no-repeat;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-end;
		width: 100%;
	}
	.show_image>image{
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}
</style>
