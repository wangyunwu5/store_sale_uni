<template>
	<view class="this_content">
		<scroll-view class="content-detail">
			<view class="content-item">
				<text>商品名称</text>
				<input type="text" placeholder="请输入商品标题" />
			</view>
			<view class="line"></view>
			<view class="content-item">
				<text>商品编号</text>
				<input type="text" placeholder="请输入商品编号" />
			</view>
			<view class="line"></view>
			<view class="content-item">
				<text>广告语</text>
				<input type="text" placeholder="请输入商品广告语" />
			</view>
			<view class="line"></view>
			<view class="content-item">
				<text>销售属性</text>
				<image @click="addvalue" class="image1" src="../../static/img/add.png"></image>
			</view>
			<view class="saleparam">
				<block v-for="(param,index) in paramlist" :key="index">
					<view class="list-item">
						<view class="sale-param-name">
							<text>属性名:{{param.name}}</text>
							<view class="param-sort">
								<text>序号</text>
								<input type="text" placeholder="--" />
							</view>
							<text @click="bindClick('4')" style="color: #d81e06;">添加属性值</text>
							<neil-modal :show="show4" @close="closeModal('4')" title="请输入用户名密码">
							    <view class="input-view">
							        <view class="input-name">
							            <view>用户名</view>
							            <input type="text" placeholder="请输入用户名" />
							        </view>
							        <view class="input-password">
							            <view>密码</view>
							            <input type="text" password placeholder="请输入密码" />
							        </view>
							    </view>
							</neil-modal>
						</view>
						<view class="line"></view>
						<view class="sale-param-value">
							<text>属性值:</text>
							<view class="value-item">
								<block v-for="(item,index) in param.valuelist" :key="index">
									<view class="v-item">
										<text>{{item.value}}</text>
										<image class="delete" src="../../static/img/delete.png"></image>
									</view>
								</block>
							</view>
						</view>
						<view class="line"></view>
						<view class="operation">
							<text>删除</text>
						</view>
					</view>
				</block>
			</view>
			<view class="content-item">
				<text>其他属性</text>
				<image class="image1" src="../../static/img/add.png"></image>
			</view>
			<view class="content-item">
				<text>轮播图</text>
				<image class="image1" src="../../static/img/add.png"></image>
			</view>
			<view class="content-item luobo">
				<view class="luobo-item">
					<image class="image2" src="../../static/img/phone11_promax.jpg"></image>
					<input type="number" placeholder="请输入序号" />
					<image class="delete" src="../../static/img/delete.png"></image>
				</view>
			</view>
			<view class="content-item">
				<text>介绍图</text>
				<image class="image1" src="../../static/img/add.png"></image>
			</view>
			<view class="content-item luobo">
				<view class="luobo-item">
					<image class="image2" src="../../static/img/phone11_promax.jpg"></image>
					<input type="number" placeholder="请输入序号" />
					<image class="delete" src="../../static/img/delete.png"></image>
				</view>
			</view>
			<view class="content-item">
				<text>文字介绍</text>
			</view>
			<view class="content-item">
				<textarea class="describe" placeholder="请输入文字"></textarea>
			</view>
			<view class="content-item">
			</view>
		</scroll-view>
		<view class="btn">
			<text @click="nextstap">下一步</text>
		</view>
	</view>
</template>

<script>
	import neilModal from '../../components/neil-modal/neil-modal.vue'
	export default {
		components: {
		    neilModal
		},
		data() {
			return {
				show4: false,
				content: '',
				paramlist: [{
					id: 1,
					name: '颜色',
					valuelist: [{
							id: 1,
							value: '红'
						},
						{
							id: 2,
							value: '黄'
						}, {
							id: 3,
							value: '蓝'
						}
					]
				}, {
					id: 2,
					name: '尺寸',
					valuelist: [{
							id: 1,
							value: '5.7寸'
						},
						{
							id: 2,
							value: '6.2寸'
						}
					]
				}, {
					id: 3,
					name: '内存',
					valuelist: [{
						id: 1,
						value: '64G'
					}, {
						id: 2,
						value: '128G'
					}]
				}]
			}
		},
		onLoad: function(option) {},
		methods: {
			/**添加属性值，弹出框 */
			addvalue() {
				uni.showToast({
					title:'添加属性'
				});
			   /* console.log(this[`show${type}`])
			    this[`show${type}`] = true
			    console.log(this[`show${type}`]) */
			},
			bindClick(type) {
				uni.showToast({
					title:'添加属性值'
				});
			    console.log(this[`show${type}`])
			    this[`show${type}`] = true
			    console.log(this[`show${type}`]) 
			},
			/** 回退弹窗取消方法 */
			closeModal(type) {
			    console.log(`监听到close`)
			    this[`show${type}`] = false
			},
			nextstap(){
				uni.showToast({
					title:'下一步'
				})
			}
		}
	}
</script>

<style>
	.this_content {
		flex: 1;
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
		width: 750rpx;
	}

	.content-detail {
		min-height: 1000rpx;
		display: flex;
		flex-direction: column;
	}

	.line {
		height: 2rpx;
		background-color: #FFFFFF;
		border-bottom: 1rpx dashed #efeff4;
	}

	.content-item {
		padding: 0 10rpx;
		min-height: 70rpx;
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
	}

	.content-item>text {
		min-width: 100rpx;
		font-size: 22rpx;
		font-weight: bold;
		text-align: center;
		color: #000000;
	}

	.content-item>input {
		flex: 1;
		font-size: 20rpx;
	}

	.image1 {
		width: 25rpx;
		height: 25rpx;
		margin-left: 30rpx;
	}

	.list-item {
		min-height: 150rpx;
		display: flex;
		flex-direction: column;
		font-size: 20rpx;
		background-color: #efeff4;
		border-radius: 8rpx;
		padding: 0 10rpx;
		border-bottom: 5rpx solid #FFFFFF;
	}

	.saleparam {
		min-height: 130rpx;
		padding: 0 10rpx;
	}

	.sale-param-name {
		height: 50rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.sale-param-value {
		min-height: 50rpx;
		display: flex;
		align-items: center;
	}

	.param-name {
		width: 160rpx;
		background-color: #007AFF;
	}

	.value-item {
		flex: 1;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.v-item {
		height: 50rpx;
		min-width: 50rpx;
		display: flex;
		align-items: center;
		margin: 0 5rpx;
	}

	.param-sort {
		width: 160rpx;
		height: 50rpx;
		display: flex;
		align-items: center;
		line-height: 50rpx;
	}

	.param-sort>text {
		width: 80rpx;
	}

	.operation {
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
	}

	.operation>text {
		background-color: #007AFF;
		padding: 6rpx 12rpx;
		color: white;
		background-color: #d81e06;
		border-radius: 8rpx;
	}

	.luobo {
		background-color: #efeff4;
		padding: 0 10rpx;
	}

	.luobo-item {
		width: 100%;
		height: 80rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-bottom: 1rpx dashed #efeff4;
	}

	.image2 {
		width: 70rpx;
		height: 70rpx;
	}

	.luobo-item>input {
		font-size: 20rpx;
		width: 200rpx;
	}

	.delete {
		height: 25rpx;
		width: 25rpx;
	}

	.describe {
		height: 200rpx;
		padding: 5rpx;
		font-size: 22rpx;
		border: 1rpx solid #efeff4;
	}

	.btn {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 80rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.btn>text {
		padding: 16rpx 32rpx;
		font-size: 20rpx;
		background-color: #d81e06;
		color: #FFFFFF;
	}

	/* 提示窗口 */
	.uni-tip {
		padding: 15px;
		width: 300px;
		background: #fff;
		box-sizing: border-box;
		border-radius: 10px;
	}

	.uni-tip-title {
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		color: #333;
		text-align: left;
	}

	.uni-tip-content {
		padding: 15px;
		font-size: 14px;
		color: #666;
		/* background: #C8C7CC; */
		border: 2upx solid #ccc;
		border-radius: 10upx;
	}

	.uni-tip-content-textarea {
		height: 300upx;
		width: 100%;
		text-align: left;
	}

	.uni-tip-group-button {
		margin-top: 10px;
		display: flex;
	}

	.uni-tip-group-button>button {
		font-size: 24upx;
		height: 40upx;
		line-height: 40upx;

	}
</style>
