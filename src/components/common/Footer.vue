<template>
  <div class="footer">
    <div class="footer-downbig-Cotainer">
			<span class="email-com-a">
				<a href="mailto:mz-marketing@meizu.com">
					<img src="../../assets/css/icon/ic_email_default.svg" />
				</a>
			</span>
      <span class="qq-info" @mouseover="qqQrcode = true" @mouseout="qqQrcode = false">
				<img src="../../assets/css/icon/ic_qq_default.svg" />
				<span id="qq_Qrcode" v-show="qqQrcode === true">
					<img src="../../assets/images/qr_code.png" alt="">
					<span class="qrcord_downIcon">
						<img src="../../assets/images/Triangle.png" alt="">
					</span>
				</span>
			</span>
      <span class="wechat-info" @mouseover="wechatQrcode = true" @mouseout="wechatQrcode = false">
				<img src="../../assets/css/icon/ic_wecaht_default.svg" />
        <span id="wechat_Qrcode" v-show="wechatQrcode === true">
            <img src="../../assets/images/qr_code.png" alt="">
            <span class="qrcord_downIcon">
						  <img src="../../assets/images/Triangle.png" alt="">
					  </span>
				</span>
			</span>
    </div>
    <p class="font-weight300">Copyright © 2017 MobiPromo Ltd.</p>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        qqQrcode: false,
        wechatQrcode: false
      }
    }
  }
</script>
<style>
  .footer {
    background: #f2f2f2;
    text-align: center;
    min-height: 160px;
  }
  .footer>div {
    padding: 0 auto;
    /*overflow: hidden;*/
    padding-top: 52px;
    margin-bottom: 17px;
    padding-left: calc(50% - 70px);
    position: absolute;
  }
  .footer>div span {
    padding: 0 15px;
    /*border-right: 1px solid rgba(255,255,255,0.38);*/
    font-size: 12px;
    float: left;
    cursor: pointer;
    position: relative;
  }
  .footer div span::after{
    content: '';
    position: absolute;
    top:50%;
    transform: translateY(-50%);
    right: 0;
    height: 8px;
    width: 1px;
    background: rgba(0,0,0,0.15);
  }
  .footer>div span:last-child::after {
    width: 0!important;
    height: 0;
  }
  .footer div span:last-child {
    border-right: none;
  }
  .footer>p {
    font-size: 14px;
    color: rgba(0,0,0,0.38);
    line-height: 22px;
    position: absolute;
    margin-top: 80px;
    left:50%;
    transform: translateX(-50%);
  }
  #qq_Qrcode ,#wechat_Qrcode{
    position: absolute;
    top:-180px;
    left: -60px;
    line-height: 0;
    box-shadow: 0 0 8px 0 rgba(0,0,0,.38);
    padding:0;
    /*display: none;*/
    transition: all 0.5s ease-in-out;
  }
  .qrcord_downIcon {
    position: absolute!important;
    right: 46px;
  }
  .qrcord_downIcon img {
    width: 34px;
    padding-bottom: 20px;
  }
</style>






