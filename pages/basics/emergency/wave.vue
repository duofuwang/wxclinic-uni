<template>
	<view>
		
		
		<view class="flex bg-white margin padding align-center justify-center radius-xl sos-container">
			<view class="flex round bg-gradual-blue shadow-blur align-center justify-center">
				<view class="container align-center justify-center">
					<view class="circle bg-gradual-blue"></view>
					<view class="circle bg-gradual-blue"></view>
					<view class="circle bg-gradual-blue"></view>
					<view class="circle bg-gradual-blue"></view>
					<view class="circle bg-gradual-blue"></view>
				</view>
				<view class="u-absolute">
					<text class="text-xxl">SOS</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.sos-container {
		height: 700rpx;
	}
	
	.container {
		width: 400rpx;
		height: 400rpx;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		/* background: #d8d8d8; */
		border-radius: 10%;
	}

	.circle {
		position: absolute;
		width: 400rpx;
		height: 400rpx;
		border-radius: 50%;
	}

	.circle:nth-child(1) {
		animation: anim 3s linear infinite;
	}

	.circle:nth-child(2) {
		animation: anim 3s linear 0.8s infinite;
	}

	.circle:nth-child(3) {
		animation: anim 3s linear 1.6s infinite;
	}
	
	.circle:nth-child(4) {
		animation: anim 3s linear 2.4s infinite;
	}

	@keyframes anim {
		from {
			opacity: 1;
			transform: scale(0);
		}
		to {
			opacity: 0;
			transform: scale(1.33);
		}
	}
</style>
