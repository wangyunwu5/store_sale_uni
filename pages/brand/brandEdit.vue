<template>
	<view class="content">
		<block v-for="(brand,index) in brandlist" :key="index">
			<view class="brand_item">
				<view class="brand">
					<text>{{brand.brand_sort}}</text>
					<image class="brand_icon" :src="brand.brand_icon"></image>
					<view class="brand_edit">
						<view class="brand_name">
							<text>{{brand.brand_name}}</text>
						</view>
						<view class="btn_delete" @tap="delbrand">删除</view>
						<view class="btn_edit" @tap="editbrand">编辑</view>
					</view>
				</view>
			</view>
		</block>
		<view class="bottom_box">
			<view class="btn_add" @tap="addbrand">新增品牌</view>
		</view>
	</view>
</template>

<script>
	export default {
		data (){
			return {
				brandlist:[
					{
						brand_id:1,
						brand_sort:'1',
						brand_icon:'../../static/img/huawei_icon.jpg',
						brand_name:'华为'
					},
					{
						brand_id:2,
						brand_sort:'2',
						brand_icon:'../../static/img/phone_icon.png',
						brand_name:'苹果'
					},{
						brand_id:3,
						brand_sort:'3',
						brand_icon:'../../static/img/sanxing_icon.jpg',
						brand_name:'三星'
					},{
						brand_id:4,
						brand_sort:'4',
						brand_icon:'../../static/img/xiaomi_icon.jpg',
						brand_name:'小米'
					},{
						brand_id:5,
						brand_sort:'5',
						brand_icon:'../../static/img/vivo_icon.jpg',
						brand_name:'vivo'
					},{
						brand_id:6,
						brand_sort:'6',
						brand_icon:'../../static/img/oppo_icon.jpg',
						brand_name:'oppo'
					}
				]
			}
		},
		methods:{
			addbrand(){
				uni.navigateTo({
					url:'addbrand'
				})
			},
			editbrand(){
				uni.navigateTo({
					url:'updatebrand'
				})
			},
			delbrand(){
				uni.showModal({
				    title: '温馨提示',
				    content: '是否确定删除此项',
					confirmColor:'#d81e06',
				    success: function (res) {
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
	.brand_item{
		min-height: 80rpx;
		margin: 5rpx 0;
	}
	.brand{
		height: 80rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10rpx;
	}
	.brand_child1{
		height: 80rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10rpx;
	}
	.brand_icon{
		width:60rpx;
		height: 60rpx;
		margin: 0 10rpx;
	}
	.brand_edit{
		flex: 1;
		display: flex;
		justify-content: ;
	}
	.brand_name{
		font-size: 22rpx;
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding:0 10rpx;
	}
	.btn_delete,.btn_edit,.btn_add{
		height: 25rpx;
		line-height: 25rpx;
		min-width: 60rpx;
		padding: 6rpx;
		font-size: 20rpx;
		text-align: center;
	}
	.btn_delete{
		border: 1rpx solid  #efeff4;
	}
	.btn_edit{
		border: 1rpx solid  #d81e06;
		color: #d81e06;
		margin-left: 10rpx;
	}
	.btn_add{
		background-color: #d81e06;
		color: #FFFFFF;
		border-radius: 8rpx;
		padding: 10rpx 20rpx;
	}
	.torightordown image{
		width: 35rpx;
		height: 35rpx;
	}
	.bottom_box{
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
	.notshow{
		display: none;
	}
</style>
