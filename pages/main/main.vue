<template>
    <view class="content_work">
        <view class="content-top">
            <view class="all_pay_amount_c">
                今日交易金额(元)
            </view>
			<view class="all_pay_amount_e">
				<countup :num="todaymoney" color="#FFFFFF" width='13' height='23' fontSize='23'></countup>
			</view>
            <view class="all_see_order_love_jian">
                <view class="item">
					<text>总浏览数</text>
					<text>{{allscan}}</text>
				</view>
                <view class="myline"></view>
				<view class="item">
					<text>总点赞数</text>
					<text>{{alllove}}</text>
				</view>
				<view class="myline"></view>
				<view class="item">
					<text>总订单数</text>
					<text>{{allorder}}</text>
				</view>
				<view class="myline"></view>
				<view class="item">
					<text>总交易额</text>
					<text>￥{{allmoney}}</text>
				</view>
            </view>
        </view>
        <view  class="content-middle">
            <view class="list-ul">
                <view class="list-li">
                	<text class="num">{{no_receive_order}}</text>
                	<text class="text">未接单订单</text>
                </view>
                <view class="list-line"></view>
				<view class="list-li">
					<text class="num">{{no_fahuo_order}}</text>
					<text class="text">待发货订单</text>
				</view>
				<view class="list-line"></view>
				<view class="list-li">
					<text class="num">{{no_service_order}}</text>
					<text class="text">待送达订单</text>
				</view>
            </view>
            <view class="list-ul">
                <view class="list-li">
					<text class="num">{{this_month_order}}</text>
					<text class="text">本月订单数</text>
				</view>
                <view class="list-line"></view>
				<view class="list-li">
					<text class="num">￥{{this_month_money}}</text>
					<text class="text">本月交易额</text>
				</view>
				<view class="list-line"></view>
				<view class="list-li">
					<text class="num">{{this_month_scan}}</text>
					<text class="text">本月浏览量</text>
				</view>
            </view>
			<view class="list-ul">
			    <view class="list-li">
					<text class="num">{{this_year_order}}</text>
					<text class="text">本年订单数</text>
				</view>
			    <view class="list-line"></view>
				<view class="list-li">
					<text class="num">￥{{this_year_money}}</text>
					<text class="text">本年交易额</text>
				</view>
				<view class="list-line"></view>
				<view class="list-li">
					<text class="num">{{this_year_scan}}</text>
					<text class="text">本年浏览量</text>
				</view>
			</view>
        </view>
		<view class="content-bottom">
			<view class="menu-ul">
				<view class="menu-li" @tap="navigateToNewVue('category','categoryEdit')">
					<image src="../../static/img/category_icon.png"></image>
					<text>分类管理</text>
				</view>
				<view class="menu-li" @tap="navigateToNewVue('brand','brandEdit')">
					<image src="../../static/img/brand_icon.png"></image>
					<text>品牌管理</text>
				</view>
				<view class="menu-li" @tap="navigateToNewVue('goods','goodsEdit')">
					<image src="../../static/img/goods_icon.png"></image>
					<text>商品管理</text>
				</view>
			</view>
			<view class="menu-ul">
				<view class="menu-li" @tap="navigateToNewVue('parameter','parameterEdit')">
					<image src="../../static/img/parameter_icon.png"></image>
					<text>属性管理</text>
				</view>
				<view class="menu-li" @tap="navigateToNewVue('order','orderEdit')">
					<image src="../../static/img/order_icon.png"></image>
					<text>订单管理</text>
				</view>
				<view class="menu-li" @tap="navigateToNewVue('refund','refundEdit')">
					<image src="../../static/img/returngoods_icon.png"></image>
					<text>退款管理</text>
				</view>
			</view>
			<view class="menu-ul">
				<view class="menu-li" @tap="navigateToNewVue('logistics','logisticsEdit')">
					<image src="../../static/img/logistics_icon.png"></image>
					<text>物流管理</text>
				</view>
				<view class="menu-li" @tap="navigateToNewVue('shop','shopEdit')">
					<image src="../../static/img/shop_icon.png"></image>
					<text>店铺管理</text>
				</view>
				<view class="menu-li" @tap="navigateToNewVue('cardticket','cardticketEdit')">
					<image src="../../static/img/card_ticket_icon.png"></image>
					<text>卡券管理</text>
				</view>
			</view>
		</view>
    </view>
</template>

<script>
    import {
        mapState
    } from 'vuex'

    export default {
		data(){
			return{
				todaymoney:0.50,
				allscan:'666885',
				alllove:'2342',
				allorder:'2356',
				allmoney:'189902.00',
				no_receive_order:'10',
				no_fahuo_order:'16',
				no_service_order:'31',
				this_month_order:'600',
				this_month_money:'5242',
				this_month_scan:'451422',
				this_year_order:'6231',
				this_year_money:'98221',
				
			}
		},
        computed: mapState(['forcedLogin', 'hasLogin', 'userName']),
		onShow() {
			this.getInfo();
		},
        onLoad() {
			const arr1 = { a:1 ,b:2 };
			const arr2 = { a:2, c:3 };
			arr1 = {...arr2};
			console.log(arr1);
            /* if (!this.hasLogin) {
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
            } */
			
			
        },
		 methods:{
			 getInfo(){	
				 
				 
				 
				 
				 
				 
				 if(this.todaymoney >=100000000.00){
				 	this.todaymoney=0;
				 }
				 else{
				 		this.todaymoney +=5.55; 
				 }
				 setTimeout(() => {
					 this.getInfo();
				 }, 6000);
			 },
			 navigateToNewVue:function(url1,url2){
				 if(url1==='order'){
				 	uni.switchTab({//跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
				 		url:`../${url1}/${url2}`
				 	})
				 }
				 else{
					 uni.navigateTo({//保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。
						/* url:'../'+url1+'/'+url2 */
						url:`../${url1}/${url2}`//es6
					 })
				 }
			 }
		 }
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
		height: 320rpx;
		background-color: #d81e06;
		color: #FFFFFF;
	}
	.all_pay_amount_c{
		height: 60rpx;
		text-align: center;
		line-height: 80rpx;
		font-size: 25rpx;
	}
	.all_pay_amount_e{
		height: 60rpx;
		text-align: center;
		padding-top: 50rpx;
		font-size: 40rpx;
		font-weight: bold;
	}
	.all_see_order_love_jian{
		padding: 0 20urpx;
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}
	.item{
		height: 100rpx;
		display: flex;
		flex-direction: column;
		font-size: 24rpx;
		align-items:center;
		justify-content:space-between;
	}
	.myline{
		width: 3rpx;
		height: 30rpx;
		background-color: white;
	}
	.content-middle{
		height: 300rpx;
		display: flex;
		flex-direction: column;
	}
	.list-ul{
		height: 100rpx;
		display: flex;
		flex-direction: row;
		padding: 0 20rpx;
		align-items:center;
		justify-content: space-around;
		border-bottom: 2rpx solid #A3A3A3;
	}
	.list-li{
		height: 80rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		font-size: 24rpx;
	}
	.list-line{
		width: 3rpx;
		height: 30rpx;
		background-color: #A3A3A3;
	}
	.text{
		color: #A3A3A3;
	}
	.all_num{
		color: #d81e06;
		font-weight: bold;
	}
	.content-bottom{
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.menu-ul{
		height: 150rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
	}
	.menu-li{
		height: 120rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	.menu-li image{
		width: 100rpx;
		height: 100rpx;
	}
	.menu-li text{
		font-size: 24rpx;
	}
</style>

