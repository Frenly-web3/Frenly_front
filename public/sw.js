if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let n={};const r=e=>a(e,t),f={module:{uri:t},exports:n,require:r};s[t]=Promise.all(c.map((e=>f[e]||r(e)))).then((e=>(i(...e),n)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts("worker-UKnv6757K_7zkFYfXmMN9.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/UKnv6757K_7zkFYfXmMN9/_buildManifest.js",revision:"4eeefa3d8b37e826c6a01d96183247a4"},{url:"/_next/static/UKnv6757K_7zkFYfXmMN9/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/144.fd29ae8d036002c4.js",revision:"fd29ae8d036002c4"},{url:"/_next/static/chunks/1470.70ff2aa2e976b267.js",revision:"70ff2aa2e976b267"},{url:"/_next/static/chunks/1744-18e9e33f963cd9b1.js",revision:"18e9e33f963cd9b1"},{url:"/_next/static/chunks/1801-bc86691808379058.js",revision:"bc86691808379058"},{url:"/_next/static/chunks/1953.33bee6d98128c6ec.js",revision:"33bee6d98128c6ec"},{url:"/_next/static/chunks/2141.2f5059ebb1a8bf89.js",revision:"2f5059ebb1a8bf89"},{url:"/_next/static/chunks/2177.2acb1e5466e559f6.js",revision:"2acb1e5466e559f6"},{url:"/_next/static/chunks/3419.8c2cbca5d963a6eb.js",revision:"8c2cbca5d963a6eb"},{url:"/_next/static/chunks/3692.8a7c05918428b443.js",revision:"8a7c05918428b443"},{url:"/_next/static/chunks/4146.368f39dc0a2d63d8.js",revision:"368f39dc0a2d63d8"},{url:"/_next/static/chunks/4209.6fa5ac6700e9fc26.js",revision:"6fa5ac6700e9fc26"},{url:"/_next/static/chunks/4568.3daab892651a67b4.js",revision:"3daab892651a67b4"},{url:"/_next/static/chunks/47.73e8c8728233fd96.js",revision:"73e8c8728233fd96"},{url:"/_next/static/chunks/4804.4a2c5c6b2222b12a.js",revision:"4a2c5c6b2222b12a"},{url:"/_next/static/chunks/501.812b60a4136e666b.js",revision:"812b60a4136e666b"},{url:"/_next/static/chunks/5412-dcce4e38423b751e.js",revision:"dcce4e38423b751e"},{url:"/_next/static/chunks/5883.e4477e9126daa625.js",revision:"e4477e9126daa625"},{url:"/_next/static/chunks/6460.3ada1c8e091a6344.js",revision:"3ada1c8e091a6344"},{url:"/_next/static/chunks/6563.099381adeb047d8f.js",revision:"099381adeb047d8f"},{url:"/_next/static/chunks/6648.861f71d760b0bca7.js",revision:"861f71d760b0bca7"},{url:"/_next/static/chunks/745.59d4777c47397ad6.js",revision:"59d4777c47397ad6"},{url:"/_next/static/chunks/8335.080d35ed5f41278f.js",revision:"080d35ed5f41278f"},{url:"/_next/static/chunks/8687.3d1f79b1a0b206ef.js",revision:"3d1f79b1a0b206ef"},{url:"/_next/static/chunks/8870.cc8050c18560eb11.js",revision:"cc8050c18560eb11"},{url:"/_next/static/chunks/9353-4e277e9658670bba.js",revision:"4e277e9658670bba"},{url:"/_next/static/chunks/9386.5d3424e791e2261a.js",revision:"5d3424e791e2261a"},{url:"/_next/static/chunks/BaseRegistrarImplementation__factory.fe17f8e1d24f069f.js",revision:"fe17f8e1d24f069f"},{url:"/_next/static/chunks/BulkRenewal__factory.7530649600739d7c.js",revision:"7530649600739d7c"},{url:"/_next/static/chunks/DNSRegistrar__factory.96309cc9ad95bbab.js",revision:"96309cc9ad95bbab"},{url:"/_next/static/chunks/DNSSECImpl__factory.21f6deb389f6fb27.js",revision:"21f6deb389f6fb27"},{url:"/_next/static/chunks/DefaultReverseResolver__factory.c75b5ff508a1998b.js",revision:"c75b5ff508a1998b"},{url:"/_next/static/chunks/ENSRegistry__factory.2cadb7e33d265e6f.js",revision:"2cadb7e33d265e6f"},{url:"/_next/static/chunks/ETHRegistrarController__factory.ae83fe109bbef573.js",revision:"ae83fe109bbef573"},{url:"/_next/static/chunks/Multicall__factory.68ecc2f140affba5.js",revision:"68ecc2f140affba5"},{url:"/_next/static/chunks/NameWrapper__factory.83a48c24774bf157.js",revision:"83a48c24774bf157"},{url:"/_next/static/chunks/P256SHA256Algorithm__factory.33a02652403a90c6.js",revision:"33a02652403a90c6"},{url:"/_next/static/chunks/PublicResolver__factory.7c3b731494d67ff8.js",revision:"7c3b731494d67ff8"},{url:"/_next/static/chunks/RSASHA1Algorithm__factory.5d05640a818b86e0.js",revision:"5d05640a818b86e0"},{url:"/_next/static/chunks/RSASHA256Algorithm__factory.2ce3a0efe33d2aa2.js",revision:"2ce3a0efe33d2aa2"},{url:"/_next/static/chunks/ReverseRegistrar__factory.52e980e95cb9b169.js",revision:"52e980e95cb9b169"},{url:"/_next/static/chunks/Root__factory.80d66370cfb86a77.js",revision:"80d66370cfb86a77"},{url:"/_next/static/chunks/SHA1Digest__factory.568d306ce8a1bd80.js",revision:"568d306ce8a1bd80"},{url:"/_next/static/chunks/SHA1NSEC3Digest__factory.5a2d85b290e8b749.js",revision:"5a2d85b290e8b749"},{url:"/_next/static/chunks/SHA256Digest__factory.b7331a17bfbb4743.js",revision:"b7331a17bfbb4743"},{url:"/_next/static/chunks/StaticMetadataService__factory.825fbba25e41320c.js",revision:"825fbba25e41320c"},{url:"/_next/static/chunks/TLDPublicSuffixList__factory.aaa2aad8aff5643d.js",revision:"aaa2aad8aff5643d"},{url:"/_next/static/chunks/UniversalResolver__factory.f0a23af6cbc45ea4.js",revision:"f0a23af6cbc45ea4"},{url:"/_next/static/chunks/batch.ebfc69327e2c2fb4.js",revision:"ebfc69327e2c2fb4"},{url:"/_next/static/chunks/batchWrappers.c6c9add67ac20af3.js",revision:"c6c9add67ac20af3"},{url:"/_next/static/chunks/commitName.ae35ff7cc5d4d86f.js",revision:"ae35ff7cc5d4d86f"},{url:"/_next/static/chunks/createSubname.603a4252c35dca2e.js",revision:"603a4252c35dca2e"},{url:"/_next/static/chunks/deleteSubname.021d0bcf49558ddf.js",revision:"021d0bcf49558ddf"},{url:"/_next/static/chunks/framework-ce84985cd166733a.js",revision:"ce84985cd166733a"},{url:"/_next/static/chunks/getAvailable.c10b30750a983cc4.js",revision:"c10b30750a983cc4"},{url:"/_next/static/chunks/getDNSOwner.9e9b0913e8db4356.js",revision:"9e9b0913e8db4356"},{url:"/_next/static/chunks/getDecryptedName.ec2968763744a348.js",revision:"ec2968763744a348"},{url:"/_next/static/chunks/getExpiry.36f6a730322bb3c2.js",revision:"36f6a730322bb3c2"},{url:"/_next/static/chunks/getHistory.2ad73716e8ddbcdc.js",revision:"2ad73716e8ddbcdc"},{url:"/_next/static/chunks/getName.58d1faa6497faee9.js",revision:"58d1faa6497faee9"},{url:"/_next/static/chunks/getNames.fb1486ff214ec7eb.js",revision:"fb1486ff214ec7eb"},{url:"/_next/static/chunks/getOwner.9bad38430e8d8508.js",revision:"9bad38430e8d8508"},{url:"/_next/static/chunks/getPrice.2705377d3056832c.js",revision:"2705377d3056832c"},{url:"/_next/static/chunks/getProfile.1ae4589191b925b3.js",revision:"1ae4589191b925b3"},{url:"/_next/static/chunks/getRecords.d911a013eea208dd.js",revision:"d911a013eea208dd"},{url:"/_next/static/chunks/getResolver.9c99b692c8e404bc.js",revision:"9c99b692c8e404bc"},{url:"/_next/static/chunks/getSpecificRecord.7a5e93bfc0db1e40.js",revision:"7a5e93bfc0db1e40"},{url:"/_next/static/chunks/getSubnames.2da7097828e0457c.js",revision:"2da7097828e0457c"},{url:"/_next/static/chunks/getWrapperData.b98686b1398aa54a.js",revision:"b98686b1398aa54a"},{url:"/_next/static/chunks/importDNSSECName.dddefd2ba93b8209.js",revision:"dddefd2ba93b8209"},{url:"/_next/static/chunks/initialGetters.77324f26fd8fc295.js",revision:"77324f26fd8fc295"},{url:"/_next/static/chunks/main-b4b81e10f5b79fb4.js",revision:"b4b81e10f5b79fb4"},{url:"/_next/static/chunks/pages/_app-bbe5bfa0da36fcb4.js",revision:"bbe5bfa0da36fcb4"},{url:"/_next/static/chunks/pages/_error-02cc11fd74b4e5ff.js",revision:"02cc11fd74b4e5ff"},{url:"/_next/static/chunks/pages/feed-84ec12c2a2eea9cb.js",revision:"84ec12c2a2eea9cb"},{url:"/_next/static/chunks/pages/feed/orange-9a7bf014363c28e0.js",revision:"9a7bf014363c28e0"},{url:"/_next/static/chunks/pages/feed/posers-3f8c19b17eba5248.js",revision:"3f8c19b17eba5248"},{url:"/_next/static/chunks/pages/index-3fac2b0c929c8846.js",revision:"3fac2b0c929c8846"},{url:"/_next/static/chunks/pages/notifications-b377f40f2b32f245.js",revision:"b377f40f2b32f245"},{url:"/_next/static/chunks/pages/profile/%5Bslug%5D-68bab7d8800d658f.js",revision:"68bab7d8800d658f"},{url:"/_next/static/chunks/pages/search-8c898f65e4aa213a.js",revision:"8c898f65e4aa213a"},{url:"/_next/static/chunks/pages/test-95ad09830f2002e4.js",revision:"95ad09830f2002e4"},{url:"/_next/static/chunks/pages/user-not-whitelisted-7e07bff7650cccc1.js",revision:"7e07bff7650cccc1"},{url:"/_next/static/chunks/pages/whitelist-supersecure-page-lorem-ipsum-fb09f088b132e8e2.js",revision:"fb09f088b132e8e2"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/registerName.f010b015cb2006ae.js",revision:"f010b015cb2006ae"},{url:"/_next/static/chunks/renewNames.7df6d390bce1af44.js",revision:"7df6d390bce1af44"},{url:"/_next/static/chunks/setFuses.4659b0da7b4dc9a2.js",revision:"4659b0da7b4dc9a2"},{url:"/_next/static/chunks/setName.109dad0f62204587.js",revision:"109dad0f62204587"},{url:"/_next/static/chunks/setRecord.335ad980db723b37.js",revision:"335ad980db723b37"},{url:"/_next/static/chunks/setRecords.c335ab15ab8d5ada.js",revision:"c335ab15ab8d5ada"},{url:"/_next/static/chunks/setResolver.9eea3008877d45bf.js",revision:"9eea3008877d45bf"},{url:"/_next/static/chunks/supportsTLD.6784b4dc8b800c6e.js",revision:"6784b4dc8b800c6e"},{url:"/_next/static/chunks/transferController.ac3c20ec2b740f52.js",revision:"ac3c20ec2b740f52"},{url:"/_next/static/chunks/transferName.92ec978713da93ac.js",revision:"92ec978713da93ac"},{url:"/_next/static/chunks/transferSubname.f8b167af9eefe7d8.js",revision:"f8b167af9eefe7d8"},{url:"/_next/static/chunks/types.877a3a9c942d502f.js",revision:"877a3a9c942d502f"},{url:"/_next/static/chunks/unwrapName.15c79c3443329652.js",revision:"15c79c3443329652"},{url:"/_next/static/chunks/webpack-b516147f9c1bcd11.js",revision:"b516147f9c1bcd11"},{url:"/_next/static/chunks/wrapName.ee05847e5e5f870f.js",revision:"ee05847e5e5f870f"},{url:"/_next/static/css/15a6a6006d4481f2.css",revision:"15a6a6006d4481f2"},{url:"/assets/favicon/android-chrome-192x192.png",revision:"b2ab843622035f0178e1582fd7f3449e"},{url:"/assets/favicon/android-chrome-512x512.png",revision:"30a22d79a5a97727efcabc3e4d8f0dbc"},{url:"/assets/favicon/apple-touch-icon.png",revision:"aac289c30e695b621648e4207770b8ef"},{url:"/assets/favicon/favicon-16x16.png",revision:"ae016bf5bdb47259b5d77e6f694c21ab"},{url:"/assets/favicon/favicon-32x32.png",revision:"fd02eaf639062e3162c36f1253ea90b2"},{url:"/assets/favicon/favicon.ico",revision:"52597da8fc1dda2c9119cdda7e202c99"},{url:"/assets/fonts/SF-Compact-Display-Medium.otf",revision:"fa2568f36e618873e04069f87691a98d"},{url:"/assets/fonts/SF-Compact-Display-Semibold.otf",revision:"3a502bad3d875600b94b4bf205177688"},{url:"/assets/fonts/SF-Mono-Regular.otf",revision:"a966b19bf0b21c6e097357354aad3446"},{url:"/assets/fonts/SF-Mono-RegularItalic.otf",revision:"f6f42a70f5823732a689716ecf413cf6"},{url:"/assets/fonts/SF-Mono-Semibold.otf",revision:"f3480068b2469276111963000e35ee1b"},{url:"/assets/fonts/SF-Mono-SemiboldItalic.otf",revision:"43e40fbcdf461f88062e36e21458e124"},{url:"/assets/fonts/SF-Pro-Display-Bold.otf",revision:"0c44101dbd06884c80542abc2c91034d"},{url:"/assets/fonts/SF-Pro-Display-Medium.otf",revision:"d887a52d8dd51d210754496dd659a379"},{url:"/assets/fonts/SF-Pro-Display-Semibold.otf",revision:"16ce86f757fffecb0e6301ab412808ed"},{url:"/assets/fonts/SF-Pro-Rounded-Bold.otf",revision:"7ca9a509e5a22c576b796a16658a9ad9"},{url:"/assets/fonts/SF-Pro-Rounded-Medium.otf",revision:"ea4c85c19095900dfbb7d06a0b9f815f"},{url:"/assets/fonts/SF-Pro-Rounded-Regular.otf",revision:"65e44011e184b9ff8f36248614d71139"},{url:"/assets/fonts/SF-Pro-Rounded-Semibold.otf",revision:"dc24eab86e4e07b110036711737402d9"},{url:"/assets/fonts/SF-Pro-Text-Light.otf",revision:"e8042105356dde9ed2c73226ed5c6a99"},{url:"/assets/fonts/SF-Pro-Text-LightItalic.otf",revision:"2f11adcfe3ee30930de70c4050f6a435"},{url:"/assets/fonts/SF-Pro-Text-Medium.otf",revision:"c0443040caff9cab04670576397562bf"},{url:"/assets/fonts/SF-Pro-Text-MediumItalic.otf",revision:"19d558a86def728a205c9a6fa55c7c07"},{url:"/assets/fonts/SF-Pro-Text-Regular.otf",revision:"0ba9e9fb58e2ef5b0fcadd4e5dafa1f5"},{url:"/assets/fonts/SF-Pro-Text-RegularItalic.otf",revision:"1ae87b2730fab77e96d2860c422d411d"},{url:"/assets/icons/Extension(1).svg",revision:"3d8d26591fdb252d28cc4fce4edef5b5"},{url:"/assets/icons/arrow-back.svg",revision:"1a28e55a3163fddd531be593b25af1d9"},{url:"/assets/icons/eyesLogo.svg",revision:"8a9808d5ecbd93e57cc10055a6da8cbc"},{url:"/assets/icons/eyesLogo_Old.svg",revision:"efc6bae93f57e9c2828c4900382969f4"},{url:"/assets/icons/feed-frenly.svg",revision:"df6905de4be9d668a0a6513e9723e58a"},{url:"/assets/icons/feed.svg",revision:"b1a3df4e8259641b758f953878e4f28d"},{url:"/assets/icons/heart.svg",revision:"7627d757a512453543e54e18935dc8f4"},{url:"/assets/icons/instagram.svg",revision:"4f012cbfbae213ea2513de7070e618a6"},{url:"/assets/icons/loader-posts.svg",revision:"79864e346061177ffae131c69b4621aa"},{url:"/assets/icons/loader.svg",revision:"ba867050fd224f971154e33ff8093cc6"},{url:"/assets/icons/logo.svg",revision:"2d2dffc127fc57e08b0b5df1690b7a06"},{url:"/assets/icons/mail.svg",revision:"a9ecd76f68e6052c499f3e0a6561e612"},{url:"/assets/icons/message.svg",revision:"a90185db3be156346942c93e8de50bc6"},{url:"/assets/icons/metamask.svg",revision:"af6ef2377ad74c3f41186009c77de011"},{url:"/assets/icons/mirror.svg",revision:"f747f304e75db57e4e2b3df0757c9223"},{url:"/assets/icons/more.svg",revision:"7bee069e50b74b3dd60992097a979874"},{url:"/assets/icons/next-arrow-accent.svg",revision:"bcadb443f543bf0485ea88c3ba8d9958"},{url:"/assets/icons/orange.svg",revision:"47397d876f9e823bf540a08bb503c0d4"},{url:"/assets/icons/posers.svg",revision:"6295cc760f49d43b99620592be1fa3a2"},{url:"/assets/icons/post-info.svg",revision:"85ae1d272cbcdda53ea69dd212976c8f"},{url:"/assets/icons/redirect.svg",revision:"943a57f564f48849fcfd47b592aaa4cb"},{url:"/assets/icons/sadEyes.svg",revision:"0cf0a27dffaca8a977988454267f12df"},{url:"/assets/icons/search.svg",revision:"986d64f59894498731bb24de72b25770"},{url:"/assets/icons/send-icon.svg",revision:"6d11654cfd97d3252a9d380d7dffb16f"},{url:"/assets/icons/share.svg",revision:"5de75f1614539846403de5c96329f353"},{url:"/assets/icons/telegram.svg",revision:"9c5fee7fbd1fa05908289d237dbe55d0"},{url:"/assets/icons/twitter.svg",revision:"6de37c77002e9013e5fb0659418ff8f4"},{url:"/assets/icons/walletconnect.svg",revision:"cdf42adc5daba7b7088cfdb1232aabc8"},{url:"/assets/icons/web.svg",revision:"b51d12356f2705eaf9b703b9725b364d"},{url:"/assets/images/close-icon.png",revision:"fa5a16607b99df8ce65a22f6b3f6e346"},{url:"/assets/images/community-feed.png",revision:"84324b791ea0149440677c13ce874b70"},{url:"/assets/images/default-avatar.png",revision:"398599463a9ef2bea1f584104300249d"},{url:"/assets/images/eyes.gif",revision:"763b0b925403d25204be24bcbf7182d0"},{url:"/assets/images/eyes.png",revision:"f27554350792bc4b1835b86a50e89f88"},{url:"/assets/images/hearth-border.png",revision:"e06a42de2ce75dfb52587eebd15cfe16"},{url:"/assets/images/loader-posts.gif",revision:"ed2f7f1b775a18561c867ff577466a17"},{url:"/assets/images/logo.png",revision:"9c953ca407e94f10c82813584833a083"},{url:"/assets/images/metamask.jpg",revision:"757bf88f2eb414a9fd9273198f4ee379"},{url:"/assets/images/metamask.png",revision:"031eba8ee35848645d2df9b4783b8bec"},{url:"/assets/images/temp-avatar.jpg",revision:"ea30c68004efb0f2871119f30561a14b"},{url:"/assets/images/temp-avatar.png",revision:"398599463a9ef2bea1f584104300249d"},{url:"/assets/images/temp-nft.jpg",revision:"1cc72121c37e16c5c071ec971b1e342c"},{url:"/icon-192x192.png",revision:"a9e9a360ca74e69977e1d014fc4a842e"},{url:"/icon-256x256.png",revision:"7b8d9adb03499f1b662111c203506bd0"},{url:"/icon-384x384.png",revision:"cbb6be8546474930a7b37b51cdf609ef"},{url:"/icon-512x512.png",revision:"2714e6bf82e15cd6f7706c6d98def4e4"},{url:"/manifest.json",revision:"7e9e90e80c6ce7ce393feade98911791"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:c})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
