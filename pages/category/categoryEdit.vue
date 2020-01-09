<template>
	 <view class="this_content">
		<block v-for="(param,index) in paramlist" :key="index">
			<view class="param_item">
				<text>{{param.param_sort}}</text>
				<image class="param_icon" :src="param.param_icon"></image>
				<view class="param_edit">
					<view class="param_name">
						<text>{{param.param_name}}</text>
						<text v-if="param.parent != ''">父级:{{param.parent}}</text>
					</view>
					<view class="btn_delete" @tap="delcategory">删除</view>
					<view class="btn_edit" @tap="editcategory">编辑</view>
				</view>
			</view>
		</block>
		<view class="bottom_box">
			<view class="btn_add" @tap="addcategory">添加分类</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				paramlist: [{
						param_id: 1,
						param_sort: '1',
						param_icon: '../../static/img/mate30_rs.jpg',
						param_name: '手机',
						parent: ''
					},
					{
						param_id: 2,
						param_sort: '2',
						param_icon: '../../static/img/computer.jpg',
						param_name: '电脑',
						parent: ''
					}, {
						param_id: 3,
						param_sort: '3',
						param_icon: '../../static/img/cloth.jpg',
						param_name: '服装',
						parent: ''
					}, {
						param_id: 4,
						param_sort: '4',
						param_icon: '../../static/img/homefurnishing.jpg',
						param_name: '家居',
						parent: ''
					}, {
						param_id: 5,
						param_sort: '5',
						param_icon: '../../static/img/mate30_rs.jpg',
						param_name: '华为',
						parent: '手机'
					}, {
						param_id: 6,
						param_sort: '6',
						param_icon: '../../static/img/phone11_promax.jpg',
						param_name: '苹果',
						parent: '手机'
					}
				]
			}
		},
		methods: {
			addcategory() {
				console.log('添加分类');
				uni.navigateTo({
					url: 'addcategory',
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			editcategory() {
				console.log("更新分类")
				uni.navigateTo({
					url: 'updatecategory'
				})
			},
			delcategory() {
				uni.showModal({
					title: '温馨提示',
					content: '是否确定删除此项',
					confirmColor: '#d81e06',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
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
		width: 750rpx;
		padding: 10rpx;
	}
	.param_item{
		padding: 10rpx;
		height: 80rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 5rpx solid #efeff4;
	}
	.param_item>text{
		font-size: 20rpx;
		min-width: 10rpx;
	}
	.param_icon {
		width: 50rpx;
		height: 50rpx;
	}

	.param_edit {
		height: 50rpx;
		display: flex;
		flex: 1;
		align-items: center;
	}

	.param_name {
		font-size: 22rpx;
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10rpx;
	}

	.btn_delete,
	.btn_edit,
	.btn_add {
		height: 25rpx;
		line-height: 25rpx;
		min-width: 60rpx;
		padding: 6rpx;
		font-size: 20rpx;
		text-align: center;
	}

	.btn_delete {
		border: 1rpx solid #efeff4;
	}

	.btn_edit {
		border: 1rpx solid #d81e06;
		color: #d81e06;
		margin-left: 10rpx;
	}

	.btn_add {
		background-color: #d81e06;
		color: #FFFFFF;
		border-radius: 8rpx;
		padding: 10rpx 20rpx;
	}

	.paramparent {
		width: 120rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		font-size: 20rpx;
	}

	.torightordown image {
		width: 35rpx;
		height: 35rpx;
	}

	.bottom_box {
		width: 750rpx;
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

	.notshow {
		display: none;
	}
</style>
