<template>
    <view class="content_work">
        <view class="content-top">
            <view class="all_pay_amount_c">
                今日付款金额(元)
            </view>
			<view class="all_pay_amount_e">3389.00</view>
            <view class="all_see_order_love_jian">
                <view class="item">
					<text>浏览人数</text>
					<text>15320</text>
				</view>
                <view class="myline"></view>
				<view class="item">
					<text>付款订单数</text>
					<text>153</text>
				</view>
				<view class="myline"></view>
				<view class="item">
					<text>付款件数</text>
					<text>1532</text>
				</view>
				<view class="myline"></view>
				<view class="item">
					<text>点赞数</text>
					<text>153200</text>
				</view>
            </view>
        </view>
        <view  class="content-middle">
            <view class="list-ul">
                <view class="list-li">
                	<text class="num">1</text>
                	<text class="text">未接单订单</text>
                </view>
                <view class="list-line"></view>
				<view class="list-li">
					<text class="num">8</text>
					<text class="text">待发货订单</text>
				</view>
				<view class="list-line"></view>
				<view class="list-li">
					<text class="num">12</text>
					<text class="text">待送达订单</text>
				</view>
            </view>
            <view class="list-ul">
                <view class="list-li">
					<text class="num">12121</text>
					<text class="text">本月订单树</text>
				</view>
                <view class="list-line"></view>
				<view class="list-li">
					<text class="num">￥80065</text>
					<text class="text">本月成交额</text>
				</view>
				<view class="list-line"></view>
				<view class="list-li">
					<text class="num">933232</text>
					<text class="text">本月浏览量</text>
				</view>
            </view>
        </view>
		<view class="content-bottom">
			<view class="menu-ul">
				<view class="menu-li">
					<image src="../../static/img/category.png"></image>
					<text>分类管理</text>
				</view>
				<view class="menu-li">
					<image src="../../static/img/cart.png"></image>
					<text>商品管理</text>
				</view>
				<view class="menu-li">
					<image src="../../static/img/order-icon.png"></image>
					<text>订单管理</text>
				</view>
			</view>
			<view class="menu-ul"></view>
		</view>
    </view>
</template>

<script>
    import {
        mapState
    } from 'vuex'

    export default {
        computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
        /* onLoad() {
            if (!this.hasLogin) {
                uni.showModal({
                    title: '未登录',
                    content: '您未登录，需要登录后才能继续',
                     //如果需要强制登录，不显示取消按钮
                    showCancel: !this.forcedLogin,
                    success: (res) => {
                        if (res.confirm) {
							  //如果需要强制登录，使用reLaunch方式
                            if (this.forcedLogin) {
                                uni.reLaunch({
                                    url: '../login/login'
                                });
                            } else {
                                uni.navigateTo({
                                    url: '../login/login'
                                });
                            }
                        }
                    }
                });
            }
        } */
    }
</script>

<style>
	.content_work{
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #FFFFFF;
	}
    .content-top{
		display: flex;
		flex-direction: column;
		height: 320upx;
		background-color: #d81e06;
		color: #FFFFFF;
	}
	.all_pay_amount_c{
		height: 60upx;
		text-align: center;
		line-height: 80upx;
		font-size: 25upx;
	}
	.all_pay_amount_e{
		height: 120upx;
		text-align: center;
		line-height: 100upx;
		font-size: 40upx;
		font-weight: bold;
	}
	.all_see_order_love_jian{
		padding: 0 20upx;
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.item{
		height: 100upx;
		display: flex;
		flex-direction: column;
		font-size: 24upx;
		align-items:center;
		justify-content:space-between;
	}
	.myline{
		width: 2upx;
		height: 30upx;
		background-color: white;
	}
	.content-middle{
		height: 300upx;
		display: flex;
		flex-direction: column;
	}
	.list-ul{
		height: 150upx;
		display: flex;
		flex-direction: row;
		padding: 0 20upx;
		align-items:center;
		justify-content: space-between;
		border-bottom: 2upx solid #A3A3A3;
	}
	.list-li{
		height: 100upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		font-size: 24upx;
	}
	.list-line{
		width: 2upx;
		height: 50upx;
		background-color: #A3A3A3;
	}
	.text{
		color: #A3A3A3;
	}
	.content-bottom{
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 0 20upx;
	}
	.menu-ul{
		height: 250upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.menu-li{
		height: 250upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	.menu-li image{
		width: 220upx;
		height: 220upx;
	}
	.menu-li text{
		font-size: 24upx;
	}
</style>

