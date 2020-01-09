<template>
	<view class="this_content">
		<view class="">
			<view v-if="shopimage ==='' || shopimage ==null" class="no_image">
				<image src="../../static/img/photograph1.png"></image>
				<text>点击添加店铺图片</text>
			</view>
			<view v-if="shopimage !='' && shopimage !=null" class="show_image" :style="{backgroundImage:`url(${shopimage})`}">
				<!-- <text> 真机调试会看不到背景图片,是因为小程序真机不能加载本地图片,需要把图片放到服务器上才能显示</text>../../static/img/shopimage.jpg -->
				<image src="../../static/img/photograph1.png"></image>
			</view>
		</view>
		<view class="separate1"></view>
		<view class="shoplogoname">
			<image :src="shoplogo"></image>
			<text>{{shopname}}</text>
		</view>
		<view class="separate1"></view>
		<view class="shoplogo">
			<text>更换店铺LOGO</text>
			<image src="../../static/img/photograph.png"></image>
		</view>
		<view class="separate2"></view>
		<view class="location">
			<text>店铺名称</text>
			<input type="text" v-model="shopnewname" placeholder="请输入新的店铺名称"/>
		</view>
		<view class="separate2"></view>
		<view class="receipt">
			<text>自动接单</text>
			<switch color="#d81e06" checked @change="receiptChange" />
		</view>
		<view class="separate2"></view>
		<view class="offlinepayment">
			<text>打开线下支付</text>
			<switch color="#d81e06" checked @change="offlinepaymentChange" />
		</view>
		<view class="separate2"></view>
		<view class="membercard">
			<text>会员卡</text>
			<switch color="#d81e06" checked @change="membercardChange" />
		</view>
		<view class="separate2"></view>
		<view class="position">
			<text>店铺位置</text>
			<label>还没有选择(点击选择)</label>
		</view>
		<view class="separate2"></view>
		<view class="location">
			<text>店铺地址</text>
			<input type="text" v-model="shoplocation" />
		</view>
		<view class="separate2"></view>
		<view class="describe">
			<view class="describe_view">
				<text>店铺简介</text>
				<text>{{describe_length}}/200</text>
			</view>
			<textarea maxlength="200" v-model="describe" @input="conInput"></textarea>
		</view>
		<view class="separate3"></view>
		<view class="btn">
			<text class="quxiao">取消</text>
			<text class="save">保存</text>
		</view>
	</view>
</template>
<script>
	export default {
		data() {//http://img000.hc360.cn/m6/M08/A7/05/wKhQoVawFzSEWiK2AAAAAA7Bfiw769.jpg
			return {
				shoplogo:'../../static/img/huawei_icon.jpg',
				shopimage: 'http://img000.hc360.cn/m6/M08/A7/05/wKhQoVawFzSEWiK2AAAAAA7Bfiw769.jpg',
				shopname: '个人百货杂店',
				shopnewname:'',
				shoplocation: 'xxx路12号',
				describe: 'xxx是一家大型的百货杂店，从事日用品以及所有生活用品经营达30余年，经营各类手机、电脑、家居、服饰、食物、纸品、卫生巾及清洁用品等',
				describe_length:0
			}
		},
		onLoad() {
			this.describe_length = this.describe.length;
		},
		methods: {
			conInput() {
				this.tatVal = this.describe.length;
				this.describe_length = this.tatVal;
				if (this.tatVal == 200) {
					uni.showToast({
						icon: 'none',
						title: '最多只能输入200個字'
					});
				}
			}
		}
	}
</script>
<style>
	.this_content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #efeff4;
		width: 750rpx;
	}
	.no_image {
		display: flex;
		height: 250rpx;
		background-color: #FAFAFA;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
	}

	.no_image>image,
	.show_image>image {
		height: 80rpx;
		width: 80rpx;
	}

	.no_image>text {
		font-size: 20rpx;
	}

	.show_image{
		display: flex;
		width: 750rpx;
		height: 250rpx;
		background-size: 100% 100%;
		background-repeat: no-repeat;
		flex-direction: column;
		justify-content: flex-end;
		align-items: flex-end;
	}

	.show_image>image {
		margin-bottom: 10rpx;
		margin-right: 10rpx;
	}

	.separate1 {
		height: 10rpx;
		background-color: #EFEFF4;
	}

	.separate2 {
		height: 2rpx;
		background-color: #EFEFF4;
	}
	.separate3{
		flex: 1;
		background-color: #EFEFF4;
	}
	.shoplogoname {
		height: 100rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 0 10rpx;
	}

	.shoplogoname>image {
		width: 80rpx;
		height: 80rpx;
		margin: 0 10rpx;
	}

	.shoplogoname>text {
		font-size: 30rpx;
		font-weight: bold;
	}

	.receipt,
	.offlinepayment,
	.membercard,.shoplogo {
		width: 750rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		height: 80rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 15rpx;
	}

	.receipt>text,
	.offlinepayment>text,
	.membercard>text,.shoplogo>text {
		font-size: 20rpx;
	}
	
	.receipt>switch,
	.offlinepayment>switch,
	.membercard>switch {
		transform: scale(0.7, 0.7);
	}
	.shoplogo>image{
		width: 40rpx;
		height: 40rpx;
		margin-right: 25rpx;
	}
	.position{
		background-color: #FFFFFF;
		height: 80rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 15rpx;
	}
	.position>label{
		color: #A3A3A3;
		font-size: 20rpx;
		margin-right: 25rpx;
	}
	.location{
		background-color: #FFFFFF;
		height: 80rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 0 15rpx;
	}

	.location>text, .position>text {
		width: 100rpx;
		margin-right: 20rpx;
		font-size: 20rpx;
	}

	.location>input {
		flex: 1;
		font-size: 20rpx;
		color: #A3A3A3;
	}

	.describe {
		height: 200rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 0 15rpx;
	}

	.describe_view{
		width: 120rpx;
		display: flex;
		flex-direction: column;
	}
	.describe_view>text{
		width: 100%;
		font-size: 20rpx;
		
	}
	.describe>textarea {
		height: 175rpx;
		display: inline-block;
		flex: 1;
		padding: 10rpx;
		font-size: 20rpx;
		color: #A3A3A3;
	}
	.btn{
		height: 100rpx;
		line-height: 100rpx;
		background-color: #FFFFFF;
		text-align: center;
	}
	.btn>text{
		padding: 10rpx 20rpx;
		font-size: 20rpx;
		border-radius: 8rpx;
		margin: 0 20rpx;
	}
	.save{
		background-color: #d81e06;
		color: #FFFFFF;
	}
	.quxiao{
		background-color: #efeff4;
		color: #000000;
	}
</style>
