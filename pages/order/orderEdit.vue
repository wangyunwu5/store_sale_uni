<template>
	<view class="tabs">
		<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
		    <view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap">
		        <text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
		    </view>
		</scroll-view>
		<view class="line-h"></view>
		<swiper :current="tabIndex" class="swiper-box" :duration="300" @change="ontabchange">
			<swiper-item style="overflow-y: scroll;"  class="swiper-item"   v-for="(tab,index) in newsList" :key="index"> <!-- v-for="(tab,index) in orderlist" :key="index" -->
				<view class="no_order_data" v-if="hasOrder===false">
					<image src="../../static/img/no_order.png"></image>
					<text>暂时没有订单哦</text>
				</view>
				<view class="have_order_data" v-if="hasOrder===true">
					<block v-for="(order,index) in orderlist" :key="index">
						<view class="order-item">
							<view class="buyer_data">
								<view class="buyer_data_up">
									<view class="purchaser">
										<image :src="order.purchaser_level_img"></image>
										<text>{{order.purchaser_level}}</text>
										<text>{{order.purchaser_name}}</text>
									</view>
									<text style="font-size: 20rpx;color: #d81e06;">等待买家付款</text>
								</view>
								<view class="buyer_data_down">
									<text>{{order.buy_time}}</text>
									<text>{{order.order_no}}</text>
								</view>
							</view>
							<view class="order_data">
								<block v-for="(goods,index) in order.goodslist" :key="index">
									<view class="goods_item">
										<view class="goods_image">
											<image :src="goods.goods_img"></image>
										</view>
										<view class="goods_name">
											<text  style="margin-right: 20rpx;">{{goods.goods_name}}</text>X<text>{{goods.buy_num}}</text>
										</view>
										<view class="goods_price">￥{{goods.goods_price}}</view>
									</view>
								</block>
							</view>
							<view class="order_summary">
								<text>共{{order.order_total}}商品</text>
								<text>合计:￥{{order.order_price_all}}</text>
								<text>(含运费￥{{order.freight}})</text>
							</view>
						</view>
					</block>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	
	export default {
		data(){
			return{
				orderlist:[
					{
						purchaser_level:'L0',
						purchaser_level_img:'../../static/img/member0_icon.png',
						purchaser_name:'野狼Disko',
						buy_time:'2019-12-27 18:39:45',
						order_no:'L2019122752462453432',
						goodslist:[
							{
								goods_img:'../../static/img/mate30_rs.jpg',
								goods_name:'华为mate30 RS 保时捷版',
								buy_num:'2',
								goods_price:'16000.00',
							},
							{
								goods_img:'../../static/img/phone11_promax.jpg',
								goods_name:'苹果phone11 pro max',
								buy_num:'2',
								goods_price:'8000.00',
							}
						],
						order_total:'4',
						order_price_all:'48000.00',
						freight:'10.00'
					},
					{
						purchaser_level:'L1',
						purchaser_level_img:'../../static/img/member1_icon.png',
						purchaser_name:'雄杰',
						buy_time:'2019-12-27 18:39:45',
						order_no:'L2019122752462453432',
						goodslist:[
							{
								goods_img:'../../static/img/mate30_rs.jpg',
								goods_name:'华为mate30 RS 保时捷版',
								buy_num:'2',
								goods_price:'16000.00',
							},
							{
								goods_img:'../../static/img/phone11_promax.jpg',
								goods_name:'苹果phone11 pro max',
								buy_num:'2',
								goods_price:'8000.00',
							}
						],
						order_total:'4',
						order_price_all:'48000.00',
						freight:'10.00'
					},
					{
						purchaser_level:'L2',
						purchaser_level_img:'../../static/img/member2_icon.png',
						purchaser_name:'我是cxkkkkkkkk',
						buy_time:'2019-12-27 18:39:45',
						order_no:'L2019122752462453432',
						goodslist:[
							{
								goods_img:'../../static/img/mate30_rs.jpg',
								goods_name:'华为mate30 RS 保时捷版',
								buy_num:'2',
								goods_price:'16000.00',
							},
							{
								goods_img:'../../static/img/phone11_promax.jpg',
								goods_name:'苹果phone11 pro max',
								buy_num:'2',
								goods_price:'8000.00',
							}
						],
						order_total:'4',
						order_price_all:'48000.00',
						freight:'10.00'
					},
					{
						purchaser_level:'L3',
						purchaser_level_img:'../../static/img/member3_icon.png',
						purchaser_name:'燕双鹰yyyyyyy',
						buy_time:'2019-12-27 18:39:45',
						order_no:'L2019122752462453432',
						goodslist:[
							{
								goods_img:'../../static/img/mate30_rs.jpg',
								goods_name:'华为mate30 RS 保时捷版',
								buy_num:'2',
								goods_price:'16000.00',
							},
							{
								goods_img:'../../static/img/phone11_promax.jpg',
								goods_name:'苹果phone11 pro max',
								buy_num:'2',
								goods_price:'8000.00',
							}
						],
						order_total:'4',
						order_price_all:'48000.00',
						freight:'10.00'
					}
				],
				newsList: [],
				tabIndex: 0,
				hasOrder:true,
				tabBars: [{
				    name: '全部',
				    id: 'quanbu'
				}, {
				    name: '待接单',
				    id: 'daijiedan'
				}, {
				    name: '待发货',
				    id: 'daifahuo'
				}, {
				    name: '待送达',
				    id: 'daisongda'
				}, {
				    name: '待退款',
				    id: 'daituikuan'
				}, {
				    name: '待评价',
				    id: 'daipingjia'
				}, {
				    name: '已退款',
				    id: 'yituikuan'
				}, {
				    name: '已完成',
				    id: 'yiwancheng'
				}, {
				    name: '已关闭',
				    id: 'yiguanbi'
				}],
				scrollInto: "",
				showTips: false,
				navigateFlag: false,
				pulling: false
			}
		},
		onLoad:function(option){
			setTimeout(()=>{
			  this.tabBars.forEach((tabBar) => {
			      this.newsList.push({
			          data: [],
			          isLoading: false,
			          refreshText: "",
			          loadingText: '加载更多...'
			      });
			  });
			  this.getList(0);
			},350)
		},
		onShow:function(){
		},
		onUnload:function(){
		},
		onReachBottom:function(){
		},
		methods:{
			ontabtap(e) {
			    let index = e.target.dataset.current || e.currentTarget.dataset.current;
			    this.switchTab(index);
			},
			ontabchange(e) {
			    let index = e.target.current || e.detail.current;
			    this.switchTab(index);
			},
			switchTab(index) {
			    if (this.tabIndex === index) {
			        return;
			    } 
			    this.tabIndex = index;
			    this.scrollInto = this.tabBars[index].id;
			
			},
			clearTabData(e) {
			    this.newsList[e].data.length = 0;
			    this.newsList[e].loadingText = "加载更多...";
			},
			refreshData() {},
			onrefresh(e) {
			    var tab = this.newsList[this.tabIndex];
			    if (!tab.refreshFlag) {
			        return;
			    }
			    tab.refreshing = true;
			    tab.refreshText = "正在刷新...";
			
			    setTimeout(() => {
			        this.refreshData();
			        this.pulling = true;
			        tab.refreshing = false;
					tab.refreshFlag = false;
			        tab.refreshText = "已刷新";
			        setTimeout(() => { // TODO fix ios和Android 动画时间相反问题
			            this.pulling = false;
			        }, 500);
			    }, 2000);
			},
			onpullingdown(e) {
			    var tab = this.newsList[this.tabIndex];
			    if (tab.refreshing || this.pulling) {
			        return;
			    }
			    if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
			        tab.refreshFlag = true;
			        tab.refreshText = "释放立即刷新";
			    } else {
			        tab.refreshFlag = false;
			        tab.refreshText = "下拉可以刷新";
			    }
			}
		}
	}
</script>

<style>
	.tabs {
	    flex: 1;
		display: flex;
	    flex-direction: column;
	    overflow: hidden;
	    background-color: #ffffff;
	    /* height: 100vh; */
	}
	
	.scroll-h {
	    width: 750rpx;
	    height: 80rpx;
	    flex-direction: row;
	    white-space: nowrap;
	}
	.uni-tab-item-title {
	    color: #555;
	    font-size: 26rpx;
	    height: 80rpx;
	    line-height: 80rpx;
	    flex-wrap: nowrap;
	    white-space: nowrap;
	}
	
	.uni-tab-item-title-active {
	    color: #d81e06;
	}
	.line-h {
	    height: 1rpx;
	    background-color: #cccccc;
	}
	.uni-tab-item {
	    display: inline-block;
	    flex-wrap: nowrap;
	    padding-left: 34rpx;
	    padding-right: 34rpx;
	}
	.swiper-box {
	    flex: 1;
	}
	.swiper-item {
	}
	.no_order_data{
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.no_order_data image{
		height: 100rpx;
		width: 100rpx;
	}
	.no_order_data text{
		font-size: 24rpx;
	}
	.have_order_data{
		height: 100%;
		padding: 10rpx 15rpx;
		background-color: #F5F5F5;
	}
	.order-item{
		min-height: 300rpx;
		background-color: #FFFFFF;
		width: 100%;
		border-radius: 10rpx;
		box-shadow: 0rpx 0rpx 10rpx #CCCCCC;
		margin: 10rpx 0;
	}
	.buyer_data{
		height: 80rpx;
		padding: 10rpx;
	}
	.buyer_data_up{
		height: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.purchaser{
		display: flex;
		flex-direction: row;
		min-width: 160rpx;
		align-items: center;
		justify-content: flex-start;
	}
	.purchaser image{
		height: 40rpx;
		width: 40rpx;
	}
	.purchaser text{
		font-size: 20rpx;
		margin-left: 10rpx;
	}
	.buyer_data_down{
		flex: 1;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		font-size: 20rpx;
		color:  #A3A3A3;
	}
	
	.goods_image{
		width:100rpx;
	}
	.goods_image image{
		height: 80rpx;
		width: 80rpx;
		border-radius: 10rpx;
	}
	.order_data{
		min-height: 90rpx;
		background-color: #FAFAFA;
		padding:10rpx;
	}
	.goods_item{
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.goods_name{
		font-size: 24rpx;
		flex: 1;
	}
	.goods_price{
		width: 120rpx;
		font-size: 22rpx;
	}
	
	.order_summary{
		height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10rpx;
	}
	.order_summary text{
		margin-left: 20rpx;
		font-size: 25rpx;
	}
</style>
