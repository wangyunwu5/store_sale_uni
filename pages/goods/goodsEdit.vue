<template>
	<view class="this_content">
		<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto">
			<view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap">
				<text class="uni-tab-item-title" :class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
			</view>
		</scroll-view>
		<view class="line-h"></view>
		<swiper :current="tabIndex" class="swiper-box" :duration="300" @change="ontabchange">
			<swiper-item  class="swiper-item" v-for="(tab,index) in newsList" :key="index">
				<scroll-view scroll-y class="navigation">
					<view :class="['nav_item',items.active==true ? 'nav_item_active' : '']" v-for="(item,index) in goodsType" :key="index"
					 @tap="goodsTypeTap(index)">{{item.name}}</view>
				</scroll-view>
				<scroll-view scroll-y class="content">
					<view class="condition"></view>
					<block v-for="(goods,index) in goodslist" :key="index">
						<view class="content_item">
							<view class="item-up">
								<image :src="goods.goodsicon"></image>
								<view class="item-right">
									<view class="goodsname">{{goods.goodsname}}</view>
									<view class="goodsprice">{{goods.goodsprice}}(￥)</view>
								</view>
							</view>
							<view class="item-down">
								<text>库存:{{goods.goodsstock}}/{{goods.stockunit}}</text>
								<text>销量:{{goods.goodssales}}/{{goods.stockunit}}</text>
							</view>
						</view>
					</block>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsList: [],
				tabIndex: 0,
				hasOrder: true,
				tabBars: [{
					name: '出售中',
					id: 'insale'
				}, {
					name: '售罄的',
					id: 'saleout'
				}, {
					name: '仓库中',
					id: 'storehouse'
				}],
				scrollInto: "",
				showTips: false,
				navigateFlag: false,
				pulling: false,
				goodsType: [{
						name: '全部',
						active: true
					},
					{
						name: '手机',
						active: false
					},
					{
						name: '电脑',
						active: false
					},
					{
						name: '家居',
						active: false
					},
					{
						name: '服饰',
						active: false
					},
					{
						name: '数码',
						active: false
					}
				],
				goodslist:[
					{
						goodsicon:'../../static/img/phone11_promax.jpg',
						goodsname:'phone11 pro max',
						goodsprice:'8000',
						goodsstock:'10000',
						stockunit:'台',
						goodssales:'2129'
					},{
						goodsicon:'../../static/img/mate30_rs.jpg',
						goodsname:'华为mate30 rs 保时捷版',
						goodsprice:'18000',
						goodsstock:'10000',
						stockunit:'台',
						goodssales:'2129'
					}
				]
			}
		},
		onLoad: function(option) {
			setTimeout(() => {
				this.tabBars.forEach((tabBar) => {
					this.newsList.push({
						data: [],
						isLoading: false,
						refreshText: "",
						loadingText: '加载更多...'
					});
				});
				this.getList(0);
			}, 350)
		},
		onShow: function() {},
		onUnload: function() {},
		onReachBottom: function() {},
		methods: {
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
	.this_content {
		flex: 1;
		display: flex;
		flex-direction: column;
		background-color: #ffffff;
		width: 750rpx;
	}

	.scroll-h {
		width: 750rpx;
		height: 60rpx;
		display: flex;
		flex-direction: row;
	}

	.uni-tab-item-title {
		color: #555;
		font-size: 26rpx;
		height: 60rpx;
		line-height: 60rpx;
		white-space: nowrap;
	}

	.uni-tab-item-title-active {
		color: #d81e06;
	}

	.line-h {
		height: 1rpx;
		background-color: #EEEEEE;
	}

	.uni-tab-item {
		display: inline-block;
		width: 250rpx;
		text-align: center;
	}

	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		background-color: #EEEEEE;
	}

	.navigation {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		width: 160rpx;
		border-right: 1rpx solid #EEEEEE;
		overflow: auto;
		background-color: white;
		height: 100%;
	}

	.nav_item {
		width: 160rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-bottom: 1rpx solid #EEEEEE;
		font-size: 22rpx;
		color: #666666;
		background-color: white;
	}

	.nav_item_active {
		border-left: 5rpx solid #333333;
		width: 174rpx;
		font-size: 26rpx;
		background-color: #F5F5F5;
		color: black;
	}



	.content {
		width: 590rpx;
		min-height: 100rpx;
		padding-left: 160rpx;
		display: flex;
		background-color: #EEEEEE;
		overflow-y: scroll;
		overflow-x: overlay;
		height: 100%;
	}

	.content_item {
		height: 200rpx;
		background-color: #FFFFFF;
		border-radius: 8rpx;
		margin: 5rpx;
	}
	.item-up{
		height: 160rpx;
		display: flex;
		align-items: center;
		padding: 0 10rpx;
		border-bottom: 1rpx dashed #EEEEEE;
	}
	.item-up>image{
		height: 120rpx;
		width: 120rpx;
	}
	.item-right{
		height: 120rpx;
		flex: 1;
		display: flex;
		flex-direction:column;
		justify-content: space-between;
		font-size: 24rpx;
	}
	.goodsname, .goodsprice{
		height: 60rpx;
		line-height: 60rpx;
		padding: 0 15rpx ;
	}
	.goodsprice{
		color: #d81e06;
	}
	.item-down{
		height: 40rpx;
		line-height: 40rpx;
		display: flex;
		justify-content: space-around;
	}
	.item-down>text{
		font-size: 20rpx;
	}
</style>
