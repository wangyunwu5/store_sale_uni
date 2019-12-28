<template>
	<view class="content">
		<block v-for="(param,index) in paramlist" :key="index">
			<view class="param_item">
				<view class="param_parent">
					<text>{{param.param_sort}}</text>
					<image class="param_icon" :src="param.param_icon"></image>
					<view class="param_edit">
						<view class="param_name">{{param.param_name}}</view>
						<view class="btn_delete">删除</view>
						<view class="btn_edit">编辑</view>
					</view>
					<image class="torightordown" src="../../static/img/toright.png"></image>
				</view>
				<block v-for="(child1,index) in param.child1" :key="index">
					<view class="param_child1">
						<text>{{child1.param_sort}})</text>
						<image class="param_icon" :src="child1.param_icon"></image>
						<view class="param_edit">
							<view class="param_name">{{child1.param_name}}</view>
							<view class="btn_delete">删除</view>
							<view class="btn_edit">编辑</view>
						</view>
						<image class="torightordown" src="../../static/img/toright.png"></image>
					</view>
				</block>
			</view>
		</block>
		<view class="bottom_box">
			<view class="btn_add">添加分类</view>
		</view>
	</view>
</template>

<script>
	export default {
		data (){
			return {
				paramlist:[
					{
						param_id:1,
						param_sort:'1',
						param_icon:'../../static/img/mate30_rs.jpg',
						param_name:'手机',
						param_havechild:true,
						child1:[
							{
								param_id:1,
								param_sort:'1',
								param_icon:'../../static/img/mate30_rs.jpg',
								param_name:'华为',
								param_havechild:false
							},{
								param_id:2,
								param_sort:'2',
								param_icon:'../../static/img/phone11_promax.jpg',
								param_name:'苹果',
								param_havechild:true
							}
						]
					},
					{
						param_id:2,
						param_sort:'2',
						param_icon:'../../static/img/computer.jpg',
						param_name:'电脑',
						param_havechild:false
					},{
						param_id:3,
						param_sort:'3',
						param_icon:'../../static/img/cloth.jpg',
						param_name:'服装',
						param_havechild:false
					},{
						param_id:4,
						param_sort:'4',
						param_icon:'../../static/img/homefurnishing.jpg',
						param_name:'家居',
						param_havechild:false
					}
				]
			}
		}
	}
</script>

<style>
	.param_item{
		min-height: 80rpx;
		margin: 5rpx 0;
	}
	.param_parent{
		height: 80rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10rpx;
	}
	.param_child1{
		height: 80rpx;
		background-color: #C0C4CC;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10rpx;
	}
	.param_icon{
		width:60rpx;
		height: 60rpx;
		margin: 0 10rpx;
	}
	.param_edit{
		flex: 1;
		display: flex;
		justify-content: ;
	}
	.param_name{
		font-size: 20rpx;
		flex: 1;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.btn_delete,.btn_edit,.btn_add{
		height: 30rpx;
		line-height: 30rpx;
		min-width: 60rpx;
		padding: 10rpx;
		font-size: 18rpx;
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
		border: 1rpx solid  #d81e06;
		color: #d81e06;
	}
	.torightordown{
		width: 40rpx;
		height: 40rpx;
		margin-left:10rpx;
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
</style>
