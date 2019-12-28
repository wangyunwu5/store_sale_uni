<template>
    <view class="user_content">
		<view class="user_data">
				<image :src="user.user_img"></image>
				<text>{{textlist}}</text>
		</view>
		<view class="menu_list">
			<block v-for="(menu,index) in menulist" :key="index">
				<view class="menu_item">
					<text class="uni-panel-text">{{menu.name}}</text>
					<image v-if="menu.id!= 'logout'" class="toright" src="../../static/img/toright.png"></image>
				</view>
			</block>
		</view>
    </view>
</template>

<script>
    import {
        mapState,
        mapMutations
    } from 'vuex'

    export default {
		data (){
			return{
				textlist:'hello天线宝宝,您已经有8个小时没有登录了!',
				user:{
					user_img:'../../static/img/user_img.jpg',
					user_name:'天线宝宝ooo',
					nologin_time:'8'
				},
				menulist:[
					{
						id:'set_background_img',
						name:'设置头像背景图片'
					},
					{
						id:'update_user',
						name:'修改个人信息'
					},
					{
						id:'update_pass',
						name:'修改密码'
					},
					{
						id:'bing_email',
						name:'绑定邮箱'
					},
					{
						id:'bing_qq',
						name:'绑定QQ'
					},
					{
						id:'app_edition',
						name:'软件版本'
					},
					{
						id:'logout',
						name:'退出'
					}
				]
			}
		},
        computed: {
            ...mapState(['hasLogin', 'forcedLogin'])
        },
        methods: {
            ...mapMutations(['logout']),
            bindLogin() {
                uni.navigateTo({
                    url: '../login/login',
                });
            },
            bindLogout() {
                this.logout();
                /**
                 * 如果需要强制登录跳转回登录页面
                 */
                if (this.forcedLogin) {
                    uni.reLaunch({
                        url: '../login/login',
                    });
                }
            }
        }
    }
</script>

<style>
	.user_content{
		flex: 1;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: column;
	}
	.user_data{
		height: 180rpx;
		background-color: #d81e06;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 15rpx;
	}
	.user_data image{
		width:130rpx;
		height: 130rpx;
		border-radius: 50%;
	}
	.user_data text{
		font-size: 24rpx;
		color: #FFFFFF;
	}
	.menu_list{
		flex: 1;
		display: flex;
		flex-direction: column;
		background-color:  #F5F5F5;
		overflow-y: scroll;
		padding: 12rpx;
	}
	.menu_item{
		height: 60rpx;
		line-height: 60rpx;
		background-color: white;
		/* border: 1upx solid #EFEFF4; */
		padding: 10rpx 16rpx;
		margin: 10rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.menu_item text{
		font-size: 24rpx;
	}
</style>
