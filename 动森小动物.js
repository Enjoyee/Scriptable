//////////////////////////////////////////
// 预览大小【小：Small，中：Medium，大：Large】
const previewSize = "Small"

// 是否需要更换背景
const changePicBg = true

// 是否是纯色背景
const colorMode = false

// 小组件背景色
const bgColor = new Color("000000")

// 默认字体
const defaultFont = Font.systemFont(18)

// 默认字体颜色
const defaultTextColor = new Color("#ffffff")

// 内容区左右边距
const padding = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
}

// 标题样式定义
let textStyle = {
    stack: undefined, // 加入到哪个内容栈显示
    marginStart: 0, // 开始距离，水平方向的就是左边距离，垂直方向的就是顶部距离
    marginEnd: 0, // 结束距离，水平方向的就是右边距离，垂直方向的就是底部距离
    text: "", // 显示的文字
    width: 0, // 宽
    height: 0, // 长
    lineLimit: 0, // 行数控制，0是全部展示
    font: undefined, // 字体
    textColor: defaultTextColor, // 文字颜色
}

// 图片样式定义
let imgStyle = {
    stack: undefined, // 加入到哪个内容栈显示
    marginStart: 0, // 开始距离，水平方向的就是左边距离，垂直方向的就是顶部距离
    marginEnd: 0, // 结束距离，水平方向的就是右边距离，垂直方向的就是底部距离
    img: undefined, // 图片资源
    width: 0, // 宽
    height: 0, // 长
    tintColor: undefined, // 图片渲染颜色
}
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////





//////////////////////////////////////
// 组件Start
const filename = `${Script.name()}.jpg`
const files = FileManager.local()
const path = files.joinPath(files.documentsDirectory(), filename)
const widget = new ListWidget()
const contentStack = widget.addStack()
//////////////////////////////////////



/*
****************************************************************************
↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
下面添加你自己的组件内容/逻辑
****************************************************************************
*/
// 获取外部输入的参数
var widgetInputRAW = args.widgetParameter
try {
  widgetInputRAW.toString()
} catch(e) {
  widgetInputRAW = ""
}
// 指定日期
var assignMonthDay = widgetInputRAW.toString() 

const imgObjs = {
    "3月9日": "https://patchwiki.biligame.com/images/dongsen/a/a2/3f1qchqu7q74dsis7uyz7jfqt6xgo0d.png",
    "10月20日": "https://patchwiki.biligame.com/images/dongsen/0/01/mnuuv9nmyb8q7qv8fuqflzn8ds465zp.png",
    "10月24日": "https://patchwiki.biligame.com/images/dongsen/7/7e/awj7kx6aqiuoventjw1w3qu7imv1f9n.png",
    "4月18日": "https://patchwiki.biligame.com/images/dongsen/8/8f/lyy1idgf70u6nyowt5lifixlwo4fxeh.png",
    "4月17日": "https://patchwiki.biligame.com/images/dongsen/4/4b/3rb923sgqde5is4t91kh2mm4s28fuct.png",
    "7月1日": "https://patchwiki.biligame.com/images/dongsen/7/7d/icyc1bivjo9jk1txakfj4pw9wpkpeuo.png",
    "12月4日": "https://patchwiki.biligame.com/images/dongsen/a/a6/47kpe9s2rqwsns95mle0nl7sw8q6ra4.png",
    "1月16日": "https://patchwiki.biligame.com/images/dongsen/9/9d/j3pzy8brhh5duoc69254qiuawgu6efs.png",
    "2月6日": "https://patchwiki.biligame.com/images/dongsen/1/19/jzi70ru0jxnp9a0v1m937v3y1m2wt7v.png",
    "1月27日": "https://patchwiki.biligame.com/images/dongsen/9/97/gk1iz5nkg7554dcjbygai8hx9or1f27.png",
    "9月27日": "https://patchwiki.biligame.com/images/dongsen/8/89/m0okhdls60la08yeqwtkjqfbif8wcc8.png",
    "7月22日": "https://patchwiki.biligame.com/images/dongsen/0/0d/0mgqwfkrc3x297y55pxjqalv6lu11b1.png",
    "3月4日": "https://patchwiki.biligame.com/images/dongsen/d/d7/4icwqsjceeke1ft4pcxz9625rwmxuja.png",
    "7月31日": "https://patchwiki.biligame.com/images/dongsen/8/89/pbj278ho6r4vuyczcied2z5711etlzq.png",
    "5月19日": "https://patchwiki.biligame.com/images/dongsen/0/0d/h9o092vymv3i9wh7hw3h6zf7f1v3f5o.png",
    "3月12日": "https://patchwiki.biligame.com/images/dongsen/8/81/duu89um5g4g80lv7ajxp2a817csqvyp.png",
    "3月31日": "https://patchwiki.biligame.com/images/dongsen/9/93/fgjyv3jqk743p9b1jsfyldco50rnqpg.png",
    "8月16日": "https://patchwiki.biligame.com/images/dongsen/0/03/fvd09yel4l88x5pk1rmyiwmf9mhhp1w.png",
    "11月9日": "https://patchwiki.biligame.com/images/dongsen/2/29/2rfhy4aut3y01csbq66kubh0kwk1mwk.png",
    "7月13日": "https://patchwiki.biligame.com/images/dongsen/a/a2/peygnbpmeg60vwfc7j1vk4sghk1o2ku.png",
    "3月22日": "https://patchwiki.biligame.com/images/dongsen/e/e7/7148nh94i4q82syg04fg0bp8iw5stpn.png",
    "9月26日": "https://patchwiki.biligame.com/images/dongsen/b/b1/rqludwtc1t21mysovsikt1ndjqs2kvf.png",
    "8月24日": "https://patchwiki.biligame.com/images/dongsen/e/e0/bboh9xv51ysue2g1r0v4fqs1vri9i5l.png",
    "3月13日": "https://patchwiki.biligame.com/images/dongsen/0/0c/lp09t1ac40s27x1e0q3alhdxbugfmin.png",
    "10月23日": "https://patchwiki.biligame.com/images/dongsen/a/ab/5n8lmrx77x4zaq0c58c751fphgs3g2j.png",
    "2月16日": "https://patchwiki.biligame.com/images/dongsen/f/fd/6dckpnus6jnvqyxgvxzvulo3xzesxpo.png",
    "2月2日": "https://patchwiki.biligame.com/images/dongsen/6/68/o1xzpnl4pbpnjiluvt7eiqsmej9cpkv.png",
    "5月16日": "https://patchwiki.biligame.com/images/dongsen/b/b6/5vkxwei43ar4fs0nvtkflvxt2bolhpa.png",
    "9月9日": "https://patchwiki.biligame.com/images/dongsen/8/8c/mqyphld9pr5k88zcymr4mjugln9oh4r.png",
    "7月17日": "https://patchwiki.biligame.com/images/dongsen/9/93/8gjxl0xwtewfx1frot3soj823141un0.png",
    "9月15日": "https://patchwiki.biligame.com/images/dongsen/e/e5/3z8cu1d44hcxfzx4ho0lrz5pp4jxe3l.png",
    "10月29日": "https://patchwiki.biligame.com/images/dongsen/0/07/85nu475h8slfwtaxm47fxd4ujfhapy2.png",
    "3月27日": "https://patchwiki.biligame.com/images/dongsen/c/c3/7d99fi1m321r7uqh4ynjemfvmcdhn5f.png",
    "11月29日": "https://patchwiki.biligame.com/images/dongsen/3/37/tn2whour3unzy1cs0qwkcqpo9bajahq.png",
    "1月1日": "https://patchwiki.biligame.com/images/dongsen/f/fd/mrpv91b59t0faao3ajelo22ybzju2h1.png",
    "6月22日": "https://patchwiki.biligame.com/images/dongsen/c/cf/565gkqkt79ynxqh784djljoare1sh42.png",
    "2月15日": "https://patchwiki.biligame.com/images/dongsen/4/40/69qnhd2ykyiu4ffwsvgwxbtghgv7ew1.png",
    "6月17日": "https://patchwiki.biligame.com/images/dongsen/2/2b/kep0zyjducbpa20y4qxvdtrnw373iky.png",
    "4月20日": "https://patchwiki.biligame.com/images/dongsen/f/f5/ezhh3zv7rwqn9a7iplt1cjf8sj1sn0e.png",
    "9月22日": "https://patchwiki.biligame.com/images/dongsen/3/39/0qk07h279fy7r5gxi7gz9bnzwck22tc.png",
    "8月1日": "https://patchwiki.biligame.com/images/dongsen/d/dc/hjv0riyqct10xo1fieojpnscxkerhhh.png",
    "9月25日": "https://patchwiki.biligame.com/images/dongsen/d/d5/if6m85xq870gov60x2cd466yhwm5vs1.png",
    "7月25日": "https://patchwiki.biligame.com/images/dongsen/8/85/kifvkn4d05id5j3w47sqj05kyeeldyk.png",
    "12月10日": "https://patchwiki.biligame.com/images/dongsen/b/b0/fzck20tr0fq4vghr32fdftjwjaj7ztv.png",
    "4月11日": "https://patchwiki.biligame.com/images/dongsen/8/88/ixudoc3lyluzyinsezw8ncbncfg7dtb.png",
    "5月20日": "https://patchwiki.biligame.com/images/dongsen/6/63/pr7jen0xri93cwywxohddv30jxq1q2t.png",
    "9月30日": "https://patchwiki.biligame.com/images/dongsen/7/72/m5qy2ekcw0tbr71z7bch7jgnszrocvq.png",
    "2月27日": "https://patchwiki.biligame.com/images/dongsen/c/cf/rqhd7zebnj9azof94c3mintkr8iywls.png",
    "11月20日": "https://patchwiki.biligame.com/images/dongsen/2/2b/obdvd9ffgwg7w10yubgqpoats16kzuz.png",
    "6月29日": "https://patchwiki.biligame.com/images/dongsen/6/67/pktjtjer77ubhb6dcflz3uf7vg0zdkn.png",
    "5月29日": "https://patchwiki.biligame.com/images/dongsen/8/86/cvvp33t5np0hnq82tn8336eunitoxa1.png",
    "4月29日": "https://patchwiki.biligame.com/images/dongsen/9/9a/6chtxm0j01j8cn31hw3kkvw3v1vfa8h.png",
    "8月13日": "https://patchwiki.biligame.com/images/dongsen/7/73/6vlkez4zljimukn5ckqketa3ofon6sz.png",
    "2月3日": "https://patchwiki.biligame.com/images/dongsen/c/c3/8bmpe8jgxlocd9rvuyv95htgo3a5a8j.png",
    "4月30日": "https://patchwiki.biligame.com/images/dongsen/2/22/lxjv0lo1arpefnac9ysddx2fhvyznwr.png",
    "3月30日": "https://patchwiki.biligame.com/images/dongsen/c/cd/i4tnpwqpj1r8c587peirpu6sly93swj.png",
    "1月12日": "https://patchwiki.biligame.com/images/dongsen/3/31/i47tys2ox8ca7nan78f49cnc8g9wzoz.png",
    "12月29日": "https://patchwiki.biligame.com/images/dongsen/1/11/oorndymygs7qo94x27bnsmqt7qdnzcq.png",
    "12月12日": "https://patchwiki.biligame.com/images/dongsen/7/71/sl1zg3z8rb6jzi17ppilwjpn5fu566b.png",
    "8月17日": "https://patchwiki.biligame.com/images/dongsen/5/53/6pogjdqiua1x1tnzvvdiwbjfp52qkv5.png",
    "10月8日": "https://patchwiki.biligame.com/images/dongsen/f/fe/0hawmivoi75im2daxz09hdyyqonwrxc.png",
    "9月28日": "https://patchwiki.biligame.com/images/dongsen/7/7b/7s4cbpguae80z6xktuce9k32g1kgkpv.png",
    "10月10日": "https://patchwiki.biligame.com/images/dongsen/2/22/ewmm6ba71xi8prb32lkgsnzzscahfd3.png",
    "3月17日": "https://patchwiki.biligame.com/images/dongsen/7/76/fmvygkzkoahgrx1hfnmmf4tk1fkx6vo.png",
    "6月24日": "https://patchwiki.biligame.com/images/dongsen/4/4a/42y0oixbjcr3033iov58pfjop8p2i5k.png",
    "11月23日": "https://patchwiki.biligame.com/images/dongsen/6/63/s5i5oriz69pozztqx31wupynoihh6pj.png",
    "6月23日": "https://patchwiki.biligame.com/images/dongsen/7/79/1erfp6xljbqj2r349ytevmgz7kcw0ax.png",
    "2月10日": "https://patchwiki.biligame.com/images/dongsen/5/57/krd6ijg6345xqm9a1ilsygbbuoj563b.png",
    "10月14日": "https://patchwiki.biligame.com/images/dongsen/e/e1/o1rvyqdbfqev4t4e9mi6y17b59b1pw8.png",
    "5月21日": "https://patchwiki.biligame.com/images/dongsen/a/aa/1z17qp0484s064hmfx6mz7o0zg5syfg.png",
    "6月15日": "https://patchwiki.biligame.com/images/dongsen/4/45/qgwupkiydqtssk9lcb20u4vqnhvwcuw.png",
    "4月16日": "https://patchwiki.biligame.com/images/dongsen/7/7d/87zyggqsehorpb0evby37v22lsb4k8n.png",
    "8月2日": "https://patchwiki.biligame.com/images/dongsen/f/f7/pguy9t7oidqq3a8ck4ztwbnr9vanjqz.png",
    "12月20日": "https://patchwiki.biligame.com/images/dongsen/4/40/rb53l2onglw3tdaljd6tb5mcy0xaw3x.png",
    "4月28日": "https://patchwiki.biligame.com/images/dongsen/7/79/njojjwcfp6y5npyyfn8n34ulun4d75j.png",
    "5月18日": "https://patchwiki.biligame.com/images/dongsen/9/93/pxhkzjrtmbjm7hv8fwhdbrf03zk1gid.png",
    "1月2日": "https://patchwiki.biligame.com/images/dongsen/2/2b/kbs48eg2l0l8j05xkdqsfw7bh4n9qof.png",
    "12月23日": "https://patchwiki.biligame.com/images/dongsen/7/78/rqqnwch9yd2ty1fzsz3axw9b7eqpfr1.png",
    "3月10日": "https://patchwiki.biligame.com/images/dongsen/4/49/59o34z38jeoh43oocsdifo0kgm7mvne.png",
    "4月27日": "https://patchwiki.biligame.com/images/dongsen/f/f5/41t4355ooxnkjs5hj1h11txy8e9q7jn.png",
    "12月9日": "https://patchwiki.biligame.com/images/dongsen/a/a6/rj09p189d8jada21ghlhoj2thg6qhwg.png",
    "8月6日": "https://patchwiki.biligame.com/images/dongsen/2/2c/g584sd7pval1beky8nkwrlvbto9x8ay.png",
    "6月11日": "https://patchwiki.biligame.com/images/dongsen/e/e5/dbh14ywrx6dakxx0xh7lrv99r30idu4.png",
    "5月10日": "https://patchwiki.biligame.com/images/dongsen/a/a2/ohr2rpaqcd4rezm6x25q3arjjcys7n2.png",
    "10月4日": "https://patchwiki.biligame.com/images/dongsen/c/c1/2o2pfw91po4usgi8im68sah5ejxq9dm.png",
    "7月12日": "https://patchwiki.biligame.com/images/dongsen/c/cc/629ff1uvi60pnrntbmlo2nimzyz0ew7.png",
    "10月1日": "https://patchwiki.biligame.com/images/dongsen/4/44/hm4dq0lmgyt8ym4esz7il2d9o06qouu.png",
    "10月12日": "https://patchwiki.biligame.com/images/dongsen/a/a9/4txtpw7gqq1yu34iukiv8s5hsodpe0b.png",
    "3月2日": "https://patchwiki.biligame.com/images/dongsen/8/8e/ru4b74i2ibkthnc3nevpa2plcaulepl.png",
    "2月12日": "https://patchwiki.biligame.com/images/dongsen/6/62/m20ph316j0abpi5pohpzkjj8hsunec8.png",
    "8月25日": "https://patchwiki.biligame.com/images/dongsen/c/c5/los096pej03ac0g5uet1gx3ygxjvjth.png",
    "11月4日": "https://patchwiki.biligame.com/images/dongsen/e/e5/h5cyjbl7jhiu8h20dfe2usem23sccje.png",
    "5月4日": "https://patchwiki.biligame.com/images/dongsen/3/3a/j3t4objv0xf9sgth4nzssuwgkttr3ai.png",
    "8月7日": "https://patchwiki.biligame.com/images/dongsen/2/23/pfwfkhhz6cv0i49y8ispf63daij5eyj.png",
    "11月16日": "https://patchwiki.biligame.com/images/dongsen/c/c7/nlarmnzsa5h1805mic8gfbeqt9avr7h.png",
    "7月27日": "https://patchwiki.biligame.com/images/dongsen/f/f4/oqjj7wie25t3bael1ksqs5fsqqnw60i.png",
    "3月26日": "https://patchwiki.biligame.com/images/dongsen/1/14/dxpmoaaw8hbp5vpzwbqg920xba2ua0q.png",
    "9月20日": "https://patchwiki.biligame.com/images/dongsen/c/c3/bogw0xegt316vrfhbzz2binuyaxb96g.png",
    "5月13日": "https://patchwiki.biligame.com/images/dongsen/6/62/7ed8zmjxsg5hg956giatowj87wcdwl3.png",
    "8月20日": "https://patchwiki.biligame.com/images/dongsen/c/c6/ij7ucye1q5gqm2eb2n0qdz2aqmjdjpe.png",
    "5月27日": "https://patchwiki.biligame.com/images/dongsen/a/a9/4plpg3r25lok9wp90jefc7zirzd9m1w.png",
    "1月18日": "https://patchwiki.biligame.com/images/dongsen/9/91/0mw0w2nz56zvpifrapf8ogf2aqnc6jm.png",
    "11月7日": "https://patchwiki.biligame.com/images/dongsen/d/d0/en26uvg5lcgznlcdpssf8athod4njzk.png",
    "2月28日": "https://patchwiki.biligame.com/images/dongsen/2/2c/ebkklcmpn60qx771gc2ron2pte0udvd.png",
    "8月4日": "https://patchwiki.biligame.com/images/dongsen/2/2f/3rn7954x4mvss7pat62sg2unwuoorhm.png",
    "9月19日": "https://patchwiki.biligame.com/images/dongsen/e/e8/0ix0qskel080j2d0gsq5bbx4cndv62q.png",
    "11月15日": "https://patchwiki.biligame.com/images/dongsen/c/c1/0o9yg767srogxentjkgaw1fy9at2944.png",
    "12月27日": "https://patchwiki.biligame.com/images/dongsen/c/ce/ncohbzaiiu4qyfcdfpmd15v44jfl2et.png",
    "6月7日": "https://patchwiki.biligame.com/images/dongsen/9/93/natub9hc3xt4duqxedgq5l8ieogc0ej.png",
    "6月9日": "https://patchwiki.biligame.com/images/dongsen/4/47/colkszeqlgjl44wcolpq4hzft032p8g.png",
    "10月25日": "https://patchwiki.biligame.com/images/dongsen/6/64/pkk961x0ti463ie3pqs2cejb7z6mnp1.png",
    "4月5日": "https://patchwiki.biligame.com/images/dongsen/5/5a/h8kt1ys4tvp003qwdg2vecwqnhu3ryp.png",
    "5月17日": "https://patchwiki.biligame.com/images/dongsen/c/c5/p02xrv5yfa83gy7fcjbfe31052tf9zv.png",
    "11月1日": "https://patchwiki.biligame.com/images/dongsen/8/8c/o2ufo80qh0jkhzl5ebxsojya0w08njb.png",
    "5月26日": "https://patchwiki.biligame.com/images/dongsen/3/36/asfugf4649czmqigm5axpivuuwwcxn8.png",
    "11月8日": "https://patchwiki.biligame.com/images/dongsen/a/a6/k9vn3t655a4ki632nxmhdo27ufb61wm.png",
    "6月10日": "https://patchwiki.biligame.com/images/dongsen/f/f0/gey80ieaqvjn87z5ggw25pqb4iji2xm.png",
    "1月4日": "https://patchwiki.biligame.com/images/dongsen/3/3a/t6cqbgbl3mkasxw9thy0n11pifltfvm.png",
    "6月27日": "https://patchwiki.biligame.com/images/dongsen/6/61/sde917jaliz3hf9ucags25ak6sgmbuc.png",
    "11月11日": "https://patchwiki.biligame.com/images/dongsen/a/a5/hyeh649whoqz0ignmkq0ess9voifovo.png",
    "7月14日": "https://patchwiki.biligame.com/images/dongsen/8/88/55hk86r706wgjzal0f1zu1u196yvxl2.png",
    "6月25日": "https://patchwiki.biligame.com/images/dongsen/7/71/psmk0thlcucjs7bue6t5zi38uda24tp.png",
    "2月1日": "https://patchwiki.biligame.com/images/dongsen/7/71/aa9fu7fnkxl3giytnfshy4zdjem1adw.png",
    "8月12日": "https://patchwiki.biligame.com/images/dongsen/4/4c/g2qz3vp03s1stckr8bw01wljz5wtldw.png",
    "2月11日": "https://patchwiki.biligame.com/images/dongsen/e/e4/6skh9jx5x5dvc2l9ohcb5q3pbqdxsea.png",
    "12月31日": "https://patchwiki.biligame.com/images/dongsen/9/92/kmze66ykg1f6c4bkggi9jqif41vuaet.png",
    "10月3日": "https://patchwiki.biligame.com/images/dongsen/a/a4/ai1cm3xmxuld41frz7vwaqz41vyjdij.png",
    "6月13日": "https://patchwiki.biligame.com/images/dongsen/7/7f/bzpikocio5973d6q1mcj9ouumcvvr5w.png",
    "1月3日": "https://patchwiki.biligame.com/images/dongsen/d/dd/bu8r96la1xkf0ex4o6l0b8kzisbt0o2.png",
    "6月18日": "https://patchwiki.biligame.com/images/dongsen/5/54/cxciz6ch2qhmbadda82z5dl54psowud.png",
    "3月7日": "https://patchwiki.biligame.com/images/dongsen/6/62/3dnh0d2eiuwv528wbn5dn4punieqrpl.png",
    "11月17日": "https://patchwiki.biligame.com/images/dongsen/3/36/ken3f6k8t384dakj94me6336iqhiyf1.png",
    "8月3日": "https://patchwiki.biligame.com/images/dongsen/4/40/pdeg0mcbkbb1ormxzkan6pgtkmb1up8.png",
    "12月8日": "https://patchwiki.biligame.com/images/dongsen/d/d0/rckuejj2qk0qebtyn6ve4pt2j70e3vm.png",
    "6月30日": "https://patchwiki.biligame.com/images/dongsen/3/3f/l6masev2ynwhgqiik8nc3muqoxi7uqa.png",
    "2月23日": "https://patchwiki.biligame.com/images/dongsen/b/ba/qv8k4badavn0tnhdvfp9wwiodvl99f8.png",
    "1月11日": "https://patchwiki.biligame.com/images/dongsen/b/bb/crmicitqddd7bku2auo4bbirqpmpwje.png",
    "12月22日": "https://patchwiki.biligame.com/images/dongsen/9/98/m7zhhg7uma7i0c1r2d8lerhf74gxemj.png",
    "2月19日": "https://patchwiki.biligame.com/images/dongsen/e/e7/mnv0xywskylaa8f5qbh6chbflse5xx4.png",
    "5月11日": "https://patchwiki.biligame.com/images/dongsen/0/0b/7s6wdk5ku9g1rzivn6k866c06ifa0xa.png",
    "1月28日": "https://patchwiki.biligame.com/images/dongsen/e/e8/kcf5gxv1cer96mcd7x5i7yjx3fbuy0s.png",
    "4月23日": "https://patchwiki.biligame.com/images/dongsen/9/9e/4mtumgv3tk4s0jc0v5sqpqvb7pdh08z.png",
    "4月8日": "https://patchwiki.biligame.com/images/dongsen/e/e3/rudqvvjnugkofh1pyzz39xcwumaxubm.png",
    "10月15日": "https://patchwiki.biligame.com/images/dongsen/5/5d/4rqmnnc0fjrmbmaj75ihcvrectr97d2.png",
    "1月20日": "https://patchwiki.biligame.com/images/dongsen/6/6f/ejx84zeqk8j32v9isbm48uvqso4mytq.png",
    "5月25日": "https://patchwiki.biligame.com/images/dongsen/9/9d/1sgr0325r11bj3kzvxlctwk6ffnnkwu.png",
    "11月24日": "https://patchwiki.biligame.com/images/dongsen/4/4e/2qmjbec3fyus66lhtq8e8rkuyksmkuv.png",
    "7月8日": "https://patchwiki.biligame.com/images/dongsen/5/58/dbu7scdrjao5a0vgxh8af5d7a5yy00f.png",
    "3月6日": "https://patchwiki.biligame.com/images/dongsen/9/92/tfdojprp04ra4a50g0r5jujozkxdlpp.png",
    "8月29日": "https://patchwiki.biligame.com/images/dongsen/3/32/qo497aek52jbl95vxsgu2yu1dh9gkqs.png",
    "10月27日": "https://patchwiki.biligame.com/images/dongsen/e/ec/jql712lgnzfa8lpqd3e6scad9hv2mz2.png",
    "6月5日": "https://patchwiki.biligame.com/images/dongsen/f/f6/q8txnu7am41kz94rbk3txar0liq8rjc.png",
    "3月23日": "https://patchwiki.biligame.com/images/dongsen/2/20/tl6m5wzyhbvt0h4rcv75irezu0aj26n.png",
    "9月21日": "https://patchwiki.biligame.com/images/dongsen/5/59/0b40egp2b7ow9w60jti8m1zzzn9o2wb.png",
    "6月6日": "https://patchwiki.biligame.com/images/dongsen/7/7d/7g5io3kqwvnmvh1pdiqit4h8h9ujd5r.png",
    "10月9日": "https://patchwiki.biligame.com/images/dongsen/9/92/t75vh1e5gcz48715cpg8kcrfezqovhe.png",
    "5月12日": "https://patchwiki.biligame.com/images/dongsen/3/38/k1yfyahl3gs9ljs7x2s3mi996wbpug4.png",
    "12月17日": "https://patchwiki.biligame.com/images/dongsen/f/f6/qp9or356mx4eprxbhi05ol56x61k8o4.png",
    "2月4日": "https://patchwiki.biligame.com/images/dongsen/e/e4/27l9vlp4npt7splyi4q05pgkfquztv3.png",
    "8月11日": "https://patchwiki.biligame.com/images/dongsen/4/4e/g4ie0cl055f54ncfwm3a7euiuf0m2fv.png",
    "8月21日": "https://patchwiki.biligame.com/images/dongsen/d/db/emquelpgwthlebr52sv40ol9wpsofll.png",
    "9月7日": "https://patchwiki.biligame.com/images/dongsen/3/33/3qjoaz07j4okjmky0nb2usicwylf947.png",
    "7月9日": "https://patchwiki.biligame.com/images/dongsen/5/51/5qe9feuth9m0juhd3y7xb179dwfvsqn.png",
    "2月13日": "https://patchwiki.biligame.com/images/dongsen/7/79/q2kqasr6hesugklqmoxenym3ohk5nvh.png",
    "7月18日": "https://patchwiki.biligame.com/images/dongsen/7/70/03hahqavmi2h4jj7mll2xicmeep7mln.png",
    "1月13日": "https://patchwiki.biligame.com/images/dongsen/8/8a/ffp0aar02eksqqds9atw9aoltbuep1y.png",
    "11月18日": "https://patchwiki.biligame.com/images/dongsen/2/2c/kn4oyqbmdvp1naxr0kyj1wqp7na86wk.png",
    "3月25日": "https://patchwiki.biligame.com/images/dongsen/b/b6/4olkj8xwx3dnpiivsj8o5h77knfuuxx.png",
    "7月21日": "https://patchwiki.biligame.com/images/dongsen/b/b1/ibim1vghz8f909jjyxjqp4ion0zv33y.png",
    "2月8日": "https://patchwiki.biligame.com/images/dongsen/d/d7/j893zf7u1cayty1uowpj48jyervqldg.png",
    "5月5日": "https://patchwiki.biligame.com/images/dongsen/c/c5/70olxzbcxny9ayriswuesp2ibfy2op3.png",
    "10月2日": "https://patchwiki.biligame.com/images/dongsen/8/8d/96ovso0lbb4pno1gx6ezwz8j64noofo.png",
    "11月10日": "https://patchwiki.biligame.com/images/dongsen/d/d8/klbh6w1itf1aiqe1ohgl838hkubysuf.png",
    "8月18日": "https://patchwiki.biligame.com/images/dongsen/5/52/74g6ceyzk3b96i6i956xbibfj1jblf1.png",
    "9月6日": "https://patchwiki.biligame.com/images/dongsen/e/ea/48rkiq6xtnvc3b0d7e23bm6gdp25dd9.png",
    "1月7日": "https://patchwiki.biligame.com/images/dongsen/1/19/ikqwt3dq1h9o480ke1q0mkw4l4zhlqn.png",
    "8月9日": "https://patchwiki.biligame.com/images/dongsen/c/c9/q4mw4rwxrhpbtu13fm5sw3hlurmtdfg.png",
    "9月1日": "https://patchwiki.biligame.com/images/dongsen/6/66/nahdv9i1uzp8xn87vhrhqdjscbh1y7z.png",
    "1月14日": "https://patchwiki.biligame.com/images/dongsen/c/c7/81kle150pdfctdrg1r9sb7pblijogse.png",
    "9月18日": "https://patchwiki.biligame.com/images/dongsen/5/52/h4uwkdwmnbwn26niy09dtdxbf1xknwk.png",
    "5月30日": "https://patchwiki.biligame.com/images/dongsen/8/81/5egq9llgwtm3r8thngyfct8fjf2hyb3.png",
    "9月11日": "https://patchwiki.biligame.com/images/dongsen/c/cd/a55zqrdef7kkktyxc163gi50lt73iu5.png",
    "10月19日": "https://patchwiki.biligame.com/images/dongsen/2/25/b0e7ejx4h0tfbrqjyvhbd26fkouervl.png",
    "10月18日": "https://patchwiki.biligame.com/images/dongsen/1/11/3iiszn72bh3y02z42hvzdyhvsuv40oi.png",
    "6月28日": "https://patchwiki.biligame.com/images/dongsen/8/8e/fs9mtvm7rv0aczz2klc709oeooloohr.png",
    "4月25日": "https://patchwiki.biligame.com/images/dongsen/7/7f/87kftednofchygtfo3x8n2egl1k3d4k.png",
    "9月24日": "https://patchwiki.biligame.com/images/dongsen/d/dd/1oyxt3seg2gggyhjquhwdncuh0h3h52.png",
    "9月12日": "https://patchwiki.biligame.com/images/dongsen/0/0a/pcv310lwe8nfurz45hwodddkgz79tst.png",
    "4月4日": "https://patchwiki.biligame.com/images/dongsen/0/03/62l7bsz16xvrbw8jjylprohoaj09n8n.png",
    "1月30日": "https://patchwiki.biligame.com/images/dongsen/3/3c/517wl1nxxlzdww8hvfpwbhk02nn7im4.png",
    "4月14日": "https://patchwiki.biligame.com/images/dongsen/e/e4/muz86rthi22e9uxjp0aj2xb49cac3om.png",
    "12月26日": "https://patchwiki.biligame.com/images/dongsen/b/bd/fk693rcqcidrjrs8ts2pdcp56lmp7q8.png",
    "3月29日": "https://patchwiki.biligame.com/images/dongsen/7/7f/rplap7kqzrycu7gevgou7b89j92j7ak.png",
    "6月20日": "https://patchwiki.biligame.com/images/dongsen/a/a1/2ldoe8a0yr537pgr85uaar5aw4pkmve.png",
    "2月25日": "https://patchwiki.biligame.com/images/dongsen/d/d7/mmr82yu5xor08h0de43j4hkl2ajh3e8.png",
    "12月5日": "https://patchwiki.biligame.com/images/dongsen/a/a8/d01fez3707oi8jma6ad7hi37ldka38g.png",
    "10月6日": "https://patchwiki.biligame.com/images/dongsen/4/49/ok9r5l58k8dh4jhwu8dbhghca8gtpmq.png",
    "5月7日": "https://patchwiki.biligame.com/images/dongsen/0/0d/g0tczkumwnmhf5hikf2rgwigs2j452t.png",
    "5月22日": "https://patchwiki.biligame.com/images/dongsen/b/b7/q3k33hekqi95zaqqj9gysq5dpwj259r.png",
    "1月25日": "https://patchwiki.biligame.com/images/dongsen/8/8a/n74e7mp7zrm7syl51wdk1qeb1sl8slo.png",
    "11月12日": "https://patchwiki.biligame.com/images/dongsen/9/99/d6sssg6olsv35l9dxl6jt93gqd6f1ju.png",
    "8月19日": "https://patchwiki.biligame.com/images/dongsen/7/7f/jwsyvjwcpppqz3tiql686zchylfww3m.png",
    "2月9日": "https://patchwiki.biligame.com/images/dongsen/7/77/2z5t9yhygcb6aga4408f182b843t4lp.png",
    "5月14日": "https://patchwiki.biligame.com/images/dongsen/e/e6/hbf44jwb4zsnlztzaefot1xcps2h6hk.png",
    "1月10日": "https://patchwiki.biligame.com/images/dongsen/5/57/et66rqm6lea9c2i584fzmadswb3ankp.png",
    "10月5日": "https://patchwiki.biligame.com/images/dongsen/6/6d/q9tuf5zigsqwi17uqvcg7tj80bmlg2i.png",
    "4月12日": "https://patchwiki.biligame.com/images/dongsen/c/cb/n717nzm6jws9zgi9drk3ayo7z7ujsgi.png",
    "11月28日": "https://patchwiki.biligame.com/images/dongsen/1/1a/jzyppv0z5ozo5reb7io9ewpoel35ysw.png",
    "3月15日": "https://patchwiki.biligame.com/images/dongsen/c/c7/pq9pp4ikfbba4qe54rbappa6xy29hvs.png",
    "6月16日": "https://patchwiki.biligame.com/images/dongsen/6/6e/rgw9ntk063coc7normdou3hd37c2lmj.png",
    "9月8日": "https://patchwiki.biligame.com/images/dongsen/b/b9/79s9vuad9fpqop5dlgknr1yrhywg8lw.png",
    "6月21日": "https://patchwiki.biligame.com/images/dongsen/d/dd/82vd9kyqcxpy2rqolwdgcu9ygrhu9tq.png",
    "12月2日": "https://patchwiki.biligame.com/images/dongsen/3/32/qt4oxo4nyn621ybj8waa04s14qmf7r2.png",
    "10月26日": "https://patchwiki.biligame.com/images/dongsen/b/b0/b4bzcaso8ws8xro1qcj0fcjuihdk85e.png",
    "6月4日": "https://patchwiki.biligame.com/images/dongsen/9/97/09tkbzszfnlabu5sxkzb915vomo6xof.png",
    "1月31日": "https://patchwiki.biligame.com/images/dongsen/0/06/67uix871ru4edcivfeqijp3emrfi7dg.png",
    "5月3日": "https://patchwiki.biligame.com/images/dongsen/1/13/s5h7ra9f9cl9c7w2gtqdc8pu0d9np7h.png",
    "10月13日": "https://patchwiki.biligame.com/images/dongsen/1/11/p4yo43embceklejg39wjcao2dflhupm.png",
    "5月1日": "https://patchwiki.biligame.com/images/dongsen/c/c8/0bdbv5dmy148jwzj6wz7i0dopz7bl23.png",
    "7月11日": "https://patchwiki.biligame.com/images/dongsen/3/35/4q9luopcjzive7y700cp1y7wxkqhhq6.png",
    "10月11日": "https://patchwiki.biligame.com/images/dongsen/f/f3/ti9k5d68jx41lo7tcwydrssvlc8jx0z.png",
    "7月20日": "https://patchwiki.biligame.com/images/dongsen/8/87/np28gskvh3c80ecv40jtczapu3dxb3u.png",
    "9月16日": "https://patchwiki.biligame.com/images/dongsen/e/e6/eppjc6f67k8cs5qubpyj0kw7v049967.png",
    "4月24日": "https://patchwiki.biligame.com/images/dongsen/1/1b/6jp0e69511ua382635cd4iil8p1huhz.png",
    "7月5日": "https://patchwiki.biligame.com/images/dongsen/7/73/1y7di93gt1xyon16g2udxbacb76bfg7.png",
    "12月7日": "https://patchwiki.biligame.com/images/dongsen/9/91/k1qhth8sh8a7zdj6f1z8nlcnt6p0cq2.png",
    "7月23日": "https://patchwiki.biligame.com/images/dongsen/d/d7/flu90iffdm6h7j6jh16m3oggkn3pfz3.png",
    "2月18日": "https://patchwiki.biligame.com/images/dongsen/e/ee/ee9iz1pjbgd4vy0o1a7s5tmyo7pmsp5.png",
    "7月29日": "https://patchwiki.biligame.com/images/dongsen/0/06/mpn3et437nwodgr4fqiyoogsjvitgru.png",
    "12月1日": "https://patchwiki.biligame.com/images/dongsen/d/df/bmh96e2zmeax3s1ffnvhd3gg4inte6c.png",
    "8月14日": "https://patchwiki.biligame.com/images/dongsen/a/a8/oan43wxd9nxjtobdcttjbd8br708uat.png",
    "3月21日": "https://patchwiki.biligame.com/images/dongsen/7/7b/evl4zb8pyitmok5i7lr2h35l0xwop54.png",
    "7月24日": "https://patchwiki.biligame.com/images/dongsen/4/4d/5kwnkz7b65lt4r0rm2oc31cvscgff71.png",
    "9月13日": "https://patchwiki.biligame.com/images/dongsen/b/b5/ig3bpkwz9ym7krs4bdlkjqs4aal7v4u.png",
    "10月17日": "https://patchwiki.biligame.com/images/dongsen/2/24/7gaw5pv3f0niodgyc694vznx82sljk6.png",
    "8月23日": "https://patchwiki.biligame.com/images/dongsen/f/fc/870tidowcze3vja3fpzqo4t4d2ujnuf.png",
    "5月31日": "https://patchwiki.biligame.com/images/dongsen/7/72/8igbn063brd1hmna4rjhmtwszyr6xpm.png",
    "4月13日": "https://patchwiki.biligame.com/images/dongsen/5/5a/jl0p136ll16vbpm9hjisv3pooxhogvu.png",
    "11月21日": "https://patchwiki.biligame.com/images/dongsen/7/75/65o6boxxh9smu76rb9p3hsqgh8azpw8.png",
    "6月12日": "https://patchwiki.biligame.com/images/dongsen/0/09/l7wsaw634rfes0dk28p0y3ajx1d6orp.png",
    "12月28日": "https://patchwiki.biligame.com/images/dongsen/a/ac/ahlsx669hvzhxnios1b21k3orylv1fv.png",
    "1月19日": "https://patchwiki.biligame.com/images/dongsen/d/de/7iinzc4mh7nflcc6axle8fe41mk32mv.png",
    "1月17日": "https://patchwiki.biligame.com/images/dongsen/c/c6/ko72zjqc754tgnu8jeicwe3v9koloj6.png",
    "4月10日": "https://patchwiki.biligame.com/images/dongsen/5/58/6ioaexbx5n483jm375o79304nxqvmsm.png",
    "7月10日": "https://patchwiki.biligame.com/images/dongsen/c/c6/1255403cd6ij684wpn5v8jonw0b1ei0.png",
    "7月7日": "https://patchwiki.biligame.com/images/dongsen/2/2f/swnl86r4t7m4shwi7j9oczpdu2oenvc.png",
    "4月2日": "https://patchwiki.biligame.com/images/dongsen/3/35/tbbis12vrf1qg8q1poys0030u4b7nc0.png",
    "8月8日": "https://patchwiki.biligame.com/images/dongsen/1/1f/jw0jnpedfzxo7o65yeqxjjd4wz6k7kw.png",
    "2月24日": "https://patchwiki.biligame.com/images/dongsen/a/a7/dnuas10v2wcwbelzublkh01tem83ti3.png",
    "5月24日": "https://patchwiki.biligame.com/images/dongsen/e/e7/lkt0k618jaiud0uunc01hkw0rcs381a.png",
    "4月22日": "https://patchwiki.biligame.com/images/dongsen/c/cd/2m741s6wpa5gu9p5euxtqntogsjuh8i.png",
    "11月13日": "https://patchwiki.biligame.com/images/dongsen/1/14/o1bi5ehmjqzb2em69ie8yl5lt8bbbcc.png",
    "2月22日": "https://patchwiki.biligame.com/images/dongsen/e/ee/fc41cdvdzsw7ezzqcaz17uv6g01vz5u.png",
    "9月23日": "https://patchwiki.biligame.com/images/dongsen/0/08/grwklqd4a2pgijsruj7zda1eqxvlr0d.png",
    "12月15日": "https://patchwiki.biligame.com/images/dongsen/8/86/ivc4gm2b9c0rnybutp9ddq1gb15qsdw.png",
    "7月4日": "https://patchwiki.biligame.com/images/dongsen/e/e3/31lebg5sp9fscdk3z34mzr86oebtsrk.png",
    "1月15日": "https://patchwiki.biligame.com/images/dongsen/d/db/4lmlxor5la0tdwdvecu9vl9vsfcu2xz.png",
    "7月30日": "https://patchwiki.biligame.com/images/dongsen/e/e0/j32zlpzdcq1tuigs88egfxi9ct0agcy.png",
    "11月27日": "https://patchwiki.biligame.com/images/dongsen/1/19/1coa4egj6wvqtkiit1ghikooq5nmw7i.png",
    "1月5日": "https://patchwiki.biligame.com/images/dongsen/5/55/scif1ak1fwdhtlfb7nl2lsni4gaftv4.png",
    "11月19日": "https://patchwiki.biligame.com/images/dongsen/9/9d/2m3gyfjhrpjd3zrshvzwx1jt781z142.png",
    "10月21日": "https://patchwiki.biligame.com/images/dongsen/0/00/l0cf2ywp1xge6fp871oqfclqzy0nz4x.png",
    "12月11日": "https://patchwiki.biligame.com/images/dongsen/e/e4/3bd68if2sc8wshowwug2o89npcc64vu.png",
    "12月21日": "https://patchwiki.biligame.com/images/dongsen/7/73/emotk22s8d2tydzai0ui9pmosrhj3nm.png",
    "6月26日": "https://patchwiki.biligame.com/images/dongsen/f/f1/9b7seaokt931ntc4kpwjsmhq4a0r8ve.png",
    "1月29日": "https://patchwiki.biligame.com/images/dongsen/d/da/9601l4myh7juqm2vnu3f6kb4z7pk0dt.png",
    "1月8日": "https://patchwiki.biligame.com/images/dongsen/c/c4/eu5id2zk5nnpi1cponvyqx8gzih8czg.png",
    "9月5日": "https://patchwiki.biligame.com/images/dongsen/d/df/ft4olv4jfqadzltoi59xx51jl3udxjk.png",
    "6月1日": "https://patchwiki.biligame.com/images/dongsen/5/5f/k8a53y9nja257aam60ppaqpkif3cuh4.png",
    "3月8日": "https://patchwiki.biligame.com/images/dongsen/0/09/lphwha59o6x5smdcpjelmmfavc4shn9.png",
    "4月6日": "https://patchwiki.biligame.com/images/dongsen/9/9b/hx2val1g0rbvrgh3cnnrlppkzyg3fyc.png",
    "2月5日": "https://patchwiki.biligame.com/images/dongsen/e/e5/988m0nzr14euy4a67yp5jm2awqr9yfv.png",
    "4月26日": "https://patchwiki.biligame.com/images/dongsen/c/c0/cy68m8ev44ou0pwnxol97z185efm32j.png",
    "7月26日": "https://patchwiki.biligame.com/images/dongsen/2/20/qf20oa4l2yt39uj470p3l9hkjkmkr9q.png",
    "10月16日": "https://patchwiki.biligame.com/images/dongsen/f/fe/mf1s7q6g9u0dhtttzwdqzyoagvl4khq.png",
    "3月1日": "https://patchwiki.biligame.com/images/dongsen/7/75/krizmcsw0syyfl0da665yy2h64xj5fk.png",
    "9月3日": "https://patchwiki.biligame.com/images/dongsen/4/4b/iosxmq8oodugccuwdh2ju4na4ks5prp.png",
    "11月2日": "https://patchwiki.biligame.com/images/dongsen/7/71/qnzzn83qvgw44oo37kbgktjwg4yllks.png",
    "11月14日": "https://patchwiki.biligame.com/images/dongsen/d/d9/qjk27gnc7tl5hl4yu6sbqldxsmkepoc.png",
    "7月28日": "https://patchwiki.biligame.com/images/dongsen/a/af/o27p868q3hdhxua7whfyrp8e2zwqdd0.png",
    "1月23日": "https://patchwiki.biligame.com/images/dongsen/e/ec/pp2znp072zvlv2ogiek1m552fgura61.png",
    "11月3日": "https://patchwiki.biligame.com/images/dongsen/7/78/5p7eo93hwyp55xx9mp5cxaorv1n4afa.png",
    "5月23日": "https://patchwiki.biligame.com/images/dongsen/b/bd/tp8hsu6ghbpawlaca0dr6kx209hkvky.png",
    "10月7日": "https://patchwiki.biligame.com/images/dongsen/0/09/363c99jl9nsyn8tkdza1808mfohjh8k.png",
    "4月21日": "https://patchwiki.biligame.com/images/dongsen/8/8c/pi1ml6l5423opdr36l5fa0rqund5mz8.png",
    "4月7日": "https://patchwiki.biligame.com/images/dongsen/8/8a/dmothrerlmfjpsbcgg1sj8y8bdavq02.png",
    "2月21日": "https://patchwiki.biligame.com/images/dongsen/3/3b/8zvcvfw73ru2tm7j2ojiur9madthv0n.png",
    "3月5日": "https://patchwiki.biligame.com/images/dongsen/e/ea/q1eil21411kw9jlb6ir6w1r17e7fd5g.png",
    "11月6日": "https://patchwiki.biligame.com/images/dongsen/6/61/ql02vbtci7ab4hr517r4m0dk6e8jgex.png",
    "9月2日": "https://patchwiki.biligame.com/images/dongsen/1/1f/du9y3miwoqbqgcaj2cmpt8vrjbairto.png",
    "5月9日": "https://patchwiki.biligame.com/images/dongsen/3/3e/4uw8h5r7efsfroiz1fwdfubb3gqxlvd.png",
    "12月30日": "https://patchwiki.biligame.com/images/dongsen/e/e1/bvlhebjvu4srieqmn8rilympp2z9val.png",
    "10月30日": "https://patchwiki.biligame.com/images/dongsen/1/1e/8301xbo3urk9tch9g6msx6hig6wrrhq.png",
    "2月20日": "https://patchwiki.biligame.com/images/dongsen/5/51/r4egt0jnu8lxllsxvi70o24uxme25x4.png",
    "3月14日": "https://patchwiki.biligame.com/images/dongsen/d/d1/ih2tu2bya6cp3b4whqhq2wycrsxnu6e.png",
    "6月2日": "https://patchwiki.biligame.com/images/dongsen/d/d6/r51r1nlkfe734as91v19xf25gg0enk4.png",
    "2月7日": "https://patchwiki.biligame.com/images/dongsen/5/59/i0jmfzci713s9ofwqrg4piif2aw2i0w.png",
    "4月3日": "https://patchwiki.biligame.com/images/dongsen/8/8b/9nmc5pj2daqmr6m6kvxd2hr5zphdbns.png",
    "12月3日": "https://patchwiki.biligame.com/images/dongsen/7/7c/4lkhhtbk1dm6dh7mx0zr06jjtist5p8.png",
    "3月19日": "https://patchwiki.biligame.com/images/dongsen/e/ef/77kati0bgxauqxuyu67pwpyjtsm0e2v.png",
    "1月6日": "https://patchwiki.biligame.com/images/dongsen/2/25/7jzjauc9zfcy88lorf1yuz7mvtftdw0.png",
    "1月9日": "https://patchwiki.biligame.com/images/dongsen/1/13/5azpbdwxoxpz1ljb68lpr08wy4a3gt4.png",
    "4月9日": "https://patchwiki.biligame.com/images/dongsen/7/7b/4fzu1zxj9k2bqx8itjd7hwtl37wvuyv.png",
    "5月6日": "https://patchwiki.biligame.com/images/dongsen/6/65/2tazxmv3v4sea1z6vh7dbghw2bnoocd.png",
    "1月22日": "https://patchwiki.biligame.com/images/dongsen/d/d9/n00g59xqa96cfu7kjb085cpj2xocj3o.png",
    "5月28日": "https://patchwiki.biligame.com/images/dongsen/e/e3/c3lbbdzgocb8qssvhixo79zwfmr9xq8.png",
    "3月3日": "https://patchwiki.biligame.com/images/dongsen/b/bc/9vyim332hu5nsf827ptj8opwnrjokr7.png",
    "1月21日": "https://patchwiki.biligame.com/images/dongsen/e/e5/bys6x2eq8pkukt2s3jaaj9eqhxufapk.png",
    "1月24日": "https://patchwiki.biligame.com/images/dongsen/e/e1/2y3wxf6fir5k8zxu1ik7hej40ru3el5.png",
    "8月28日": "https://patchwiki.biligame.com/images/dongsen/a/a7/jhciny9gwfym04n74ph0soihjhkb5uw.png",
    "10月28日": "https://patchwiki.biligame.com/images/dongsen/1/17/5aeptqefmdhnn7txpx4hdob27ozbx83.png",
    "8月10日": "https://patchwiki.biligame.com/images/dongsen/4/48/bgxtgs2w76gheg0269u9fp4pr3tx8rn.png",
    "12月25日": "https://patchwiki.biligame.com/images/dongsen/6/68/klaxl8prjk4p3dkly9621q3vzqkjaim.png",
    "3月11日": "https://patchwiki.biligame.com/images/dongsen/4/48/m5tfdviryiozol7qsv8ji7ddhpon3kd.png",
    "12月16日": "https://patchwiki.biligame.com/images/dongsen/a/a8/1mj4m56aedht79cldybbsbnt0ztrimm.png",
    "3月28日": "https://patchwiki.biligame.com/images/dongsen/2/2d/hy4wi3i6uscn2wcz5v5uq6goczlqz0k.png",
    "7月6日": "https://patchwiki.biligame.com/images/dongsen/f/f5/46xpeboflx1meoo7q9gy8dbnodr8ff6.png",
    "3月16日": "https://patchwiki.biligame.com/images/dongsen/b/b8/5poq2lslegj7bwt4lpoyeqfao49lold.png",
    "3月20日": "https://patchwiki.biligame.com/images/dongsen/4/44/hg3hckbwer9j339rb11moywaj6smy5z.png",
    "6月14日": "https://patchwiki.biligame.com/images/dongsen/5/5c/am40yyinov5mmkclttkyubirkadmquy.png",
    "9月4日": "https://patchwiki.biligame.com/images/dongsen/3/30/dxppkhuxf3hb0k98ojq5tv7qdypoisz.png",
    "6月3日": "https://patchwiki.biligame.com/images/dongsen/c/c6/5mgfgi38q1z353mkz2rvc40yioowh6g.png",
    "8月15日": "https://patchwiki.biligame.com/images/dongsen/8/81/6giwy3r977txgkka02n3rlk3x4gzu1a.png",
    "9月29日": "https://patchwiki.biligame.com/images/dongsen/6/6e/g6cocxxla3629wil6gucwpl6ojtzmt7.png",
    "6月19日": "https://patchwiki.biligame.com/images/dongsen/2/21/3gugjnk28cr8qg8x1uki514uclxz3uw.png",
    "11月30日": "https://patchwiki.biligame.com/images/dongsen/4/40/a2ajfmigfx0750e4tboeb956k1i9ies.png",
    "9月10日": "https://patchwiki.biligame.com/images/dongsen/4/42/tfcendmm114460krzuncw38g35toxmc.png",
    "3月18日": "https://patchwiki.biligame.com/images/dongsen/d/d7/orr001b5scgm12acutroxom53ypwy4t.png",
    "10月22日": "https://patchwiki.biligame.com/images/dongsen/1/14/3oxpxd38p755jomjc4jit9im19tuka0.png",
    "7月19日": "https://patchwiki.biligame.com/images/dongsen/9/9a/nhzwz0iex2z2u7zsy46o0xs7xvf5wj9.png",
    "7月16日": "https://patchwiki.biligame.com/images/dongsen/a/a2/7mq0v32x7priwqdbtjod1jokas7pcdy.png",
    "5月2日": "https://patchwiki.biligame.com/images/dongsen/c/ca/tsp10ljuqsd4kvz943x0dbltz0zip3h.png",
    "6月8日": "https://patchwiki.biligame.com/images/dongsen/8/89/gpzswatfsel82x786vxqz41jyvuhv14.png",
    "11月26日": "https://patchwiki.biligame.com/images/dongsen/9/9b/75lfwzz80r5zwdbu8wxotxaidsnkfa6.png",
    "8月5日": "https://patchwiki.biligame.com/images/dongsen/c/ca/tin80dfsjanwhjgpg3d19a56rd83dr8.png",
    "7月2日": "https://patchwiki.biligame.com/images/dongsen/9/9e/q2zi9f8l8cxhz6ecfo64rlzsqmm5y3b.png",
    "2月14日": "https://patchwiki.biligame.com/images/dongsen/d/da/9fzg1ls7g5c3txuxphubiwooxbr4pnc.png",
    "9月14日": "https://patchwiki.biligame.com/images/dongsen/8/88/faw8dqzaoiwdy5aydcd53reqz91901w.png",
    "7月3日": "https://patchwiki.biligame.com/images/dongsen/6/6a/22xnhu86ba85vz1sc8a7ejfm7vsyob6.png",
    "5月8日": "https://patchwiki.biligame.com/images/dongsen/6/6b/da7keq4702or8uryye6gtuvaz8013aa.png",
    "2月26日": "https://patchwiki.biligame.com/images/dongsen/b/bc/ekm2yudn1s5612zih4m7wwlu2ius8dq.png",
    "7月15日": "https://patchwiki.biligame.com/images/dongsen/d/da/0ofd7l03sge6meme22rny0g5t4ji3hm.png",
    "4月19日": "https://patchwiki.biligame.com/images/dongsen/9/97/hu80fyzr8qbhkb20k13iau0rsc6yihf.png",
    "12月6日": "https://patchwiki.biligame.com/images/dongsen/e/eb/jcjwvzzmjk45jb9k5birc565es5m8yv.png",
    "12月19日": "https://patchwiki.biligame.com/images/dongsen/9/91/g1egdrwvc36wsoyb04qc200964s4vo9.png",
    "12月14日": "https://patchwiki.biligame.com/images/dongsen/5/54/hb8mz0w85y37bhihntt2lg2sgoh6uhd.png",
    "8月27日": "https://patchwiki.biligame.com/images/dongsen/c/c2/b5laxy8ycy0mskwkunh92mb0mie9f9i.png",
    "8月31日": "https://patchwiki.biligame.com/images/dongsen/6/6b/knbp2rll0jrxv0dg852v7vfd526dxxn.png",
    "11月5日": "https://patchwiki.biligame.com/images/dongsen/7/7b/gzvtv3f7vwubiyhszmufw8xuyso33jw.png",
    "8月30日": "https://patchwiki.biligame.com/images/dongsen/2/2b/56zv4rn61ilgrau9ew8248ofkd6s5o2.png",
    "12月18日": "https://patchwiki.biligame.com/images/dongsen/1/1a/auyz5rbgrl3lq22lk6032qaw9nsf81x.png",
    "5月15日": "https://patchwiki.biligame.com/images/dongsen/c/cf/2tycl7qyndgzoz90sxad3rztqaj284p.png",
    "11月25日": "https://patchwiki.biligame.com/images/dongsen/b/b0/6sc4r820h43gljz7rlp92a37qbzbufp.png",
    "8月22日": "https://patchwiki.biligame.com/images/dongsen/e/ed/ezffzxnypqy04hnnmnj8xaezpgsor29.png",
    "1月26日": "https://patchwiki.biligame.com/images/dongsen/f/f6/al2ebe3fm8b9mvrurrxbh3ux2xitl33.png",
    "11月22日": "https://patchwiki.biligame.com/images/dongsen/b/b4/hompta8by1y633ydqmp8uldja6mh7bd.png",
    "9月17日": "https://patchwiki.biligame.com/images/dongsen/1/1f/0dktb2cyzk4my0h0wrn6k4qzei5fu47.png",
    "8月26日": "https://patchwiki.biligame.com/images/dongsen/b/bc/h937s6xnou6mc9h6ytnx55jsoodda9v.png",
    "3月24日": "https://patchwiki.biligame.com/images/dongsen/3/38/0yr4p5kk01pxlda7crx34dnmt9siklv.png",
    "12月13日": "https://patchwiki.biligame.com/images/dongsen/7/71/62iqqf2n75p9lu9kofx9rjwyku7bknj.png",
    "2月17日": "https://patchwiki.biligame.com/images/dongsen/7/78/jb1yvqgwlfkvbxq7bnh9p2knmd1zd18.png"
}

const date = new Date()
const month = date.getMonth() + 1
const day = date.getDate()
let monthDayStr = `${month}月${day}日`
if(assignMonthDay.length > 0) {
    monthDayStr = assignMonthDay
}
log(`日期：${monthDayStr}`)

let imgUrl = imgObjs[monthDayStr]
if(imgUrl == undefined) {
    imgUrl = imgObjs["12月4日"]
}
let img = await getImage(imgUrl)
imgStyle.stack = contentStack
imgStyle.width = 138
imgStyle.height = 138
imgStyle.img = img
addStyleImg()


/*
****************************************************************************
上面添加你自己的组件内容/逻辑
↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
****************************************************************************
*/


/*
****************************************************************************
* 这里是图片逻辑，不用修改
****************************************************************************
*/

if (!colorMode && !config.runsInWidget && changePicBg) {
    const okTips = "您的小部件背景已准备就绪"
    let message = "图片模式支持相册照片&背景透明"
    let options = ["图片选择", "透明背景"]
    let isTransparentMode = await generateAlert(message, options)
    if (!isTransparentMode) {
        let img = await Photos.fromLibrary()
        message = okTips
        const resultOptions = ["好的"]
        await generateAlert(message, resultOptions)
        files.writeImage(path, img)
    } else {
        message = "以下是【透明背景】生成步骤，如果你没有屏幕截图请退出，并返回主屏幕长按进入编辑模式。滑动到最右边的空白页截图。然后重新运行！"
        let exitOptions = ["继续(已有截图)", "退出(没有截图)"]

        let shouldExit = await generateAlert(message, exitOptions)
        if (shouldExit) return

        // Get screenshot and determine phone size.
        let img = await Photos.fromLibrary()
        let height = img.size.height
        let phone = phoneSizes()[height]
        if (!phone) {
            message = "您似乎选择了非iPhone屏幕截图的图像，或者不支持您的iPhone。请使用其他图像再试一次!"
            await generateAlert(message, ["好的！我现在去截图"])
            return
        }

        // Prompt for widget size and position.
        message = "您想要创建什么尺寸的小部件？"
        let sizes = ["小号", "中号", "大号"]
        let size = await generateAlert(message, sizes)
        let widgetSize = sizes[size]

        message = "您想它在什么位置？"
        message += (height == 1136 ? " (请注意，您的设备仅支持两行小部件，因此中间和底部选项相同。)" : "")

        // Determine image crop based on phone size.
        let crop = { w: "", h: "", x: "", y: "" }
        if (widgetSize == "小号") {
            crop.w = phone.小号
            crop.h = phone.小号
            let positions = ["顶部 左边", "顶部 右边", "中间 左边", "中间 右边", "底部 左边", "底部 右边"]
            let position = await generateAlert(message, positions)

            // Convert the two words into two keys for the phone size dictionary.
            let keys = positions[position].split(' ')
            crop.y = phone[keys[0]]
            crop.x = phone[keys[1]]

        } else if (widgetSize == "中号") {
            crop.w = phone.中号
            crop.h = phone.小号

            // 中号 and 大号 widgets have a fixed x-value.
            crop.x = phone.左边
            let positions = ["顶部", "中间", "底部"]
            let position = await generateAlert(message, positions)
            let key = positions[position].toLowerCase()
            crop.y = phone[key]

        } else if (widgetSize == "大号") {
            crop.w = phone.中号
            crop.h = phone.大号
            crop.x = phone.左边
            let positions = ["顶部", "底部"]
            let position = await generateAlert(message, positions)

            // 大号 widgets at the 底部 have the "中间" y-value.
            crop.y = position ? phone.中间 : phone.顶部
        }

        // Crop image and finalize the widget.
        let imgCrop = cropImage(img, new Rect(crop.x, crop.y, crop.w, crop.h))

        message = "您的小部件背景已准备就绪，退出到桌面预览。"
        const resultOptions = ["好的"]
        await generateAlert(message, resultOptions)
        files.writeImage(path, imgCrop)
    }

}


//////////////////////////////////////
// 组件End
// 设置小组件的背景
if (colorMode) {
    widget.backgroundColor = bgColor
} else {
    widget.backgroundImage = files.readImage(path)
}
// 设置边距(上，左，下，右)
widget.setPadding(padding.top, padding.left, padding.bottom, padding.right)
// 设置组件
Script.setWidget(widget)
// 完成脚本
Script.complete()
// 预览
if (previewSize == "Large") {
    widget.presentLarge()
} else if (previewSize == "Medium") {
    widget.presentMedium()
} else {
    widget.presentSmall()
}
//////////////////////////////////////

/*
****************************************************************************
* 重置文本样式
****************************************************************************
*/
function resetTextStyle() {
    textStyle.stack = undefined // 加入到哪个内容栈显示
    textStyle.marginStart = 0
    textStyle.marginEnd = 0
    textStyle.text = "" // 显示的文字
    textStyle.width = 0 // 宽
    textStyle.height = 0 // 长
    textStyle.lineLimit = 0 // 行数控制，0是全部展示
    textStyle.font = undefined // 字体
    textStyle.textColor = defaultTextColor // 文字颜色
}

/*
****************************************************************************
* 重置图片样式
****************************************************************************
*/
function resetImgStyle() {
    imgStyle.stack = undefined // 加入到哪个内容栈显示
    textStyle.marginStart = 0
    textStyle.marginEnd = 0
    imgStyle.img = undefined // 图片资源
    imgStyle.width = 0 // 宽
    imgStyle.height = 0 // 长
    imgStyle.tintColor = undefined // 图片渲染颜色
}

/*
****************************************************************************
* 添加一行文本数据进行显示
****************************************************************************
*/
function addStyleText() {
    const contentStack = textStyle.stack
    if (contentStack == undefined) {
        return
    }

    const marginStart = textStyle.marginStart
    if (marginStart != undefined && marginStart != 0) {
        contentStack.addSpacer(marginStart)
    }

    const textSpan = contentStack.addText(`${textStyle.text}`)
    contentStack.size = new Size(textStyle.width, textStyle.height)
    textSpan.lineLimit = textStyle.lineLimit
    textSpan.font = textStyle.font
    textSpan.textColor = textStyle.textColor

    const marginEnd = textStyle.marginEnd
    if (marginStart != undefined && marginStart != 0) {
        contentStack.addSpacer(marginEnd)
    }

    // 重置样式
    resetTextStyle()
}

/*
****************************************************************************
* 添加图片进行显示
****************************************************************************
*/
function addStyleImg() {
    const contentStack = imgStyle.stack
    if (contentStack == undefined) {
        return
    }

    const marginStart = textStyle.marginStart
    if (marginStart != undefined && marginStart != 0) {
        contentStack.addSpacer(marginStart)
    }

    const imgSpan = contentStack.addImage(imgStyle.img)
    imgSpan.imageSize = new Size(imgStyle.width, imgStyle.height)
    const tintColor = imgStyle.tintColor
    if (tintColor != undefined) {
        imgSpan.tintColor = tintColor
    }

    const marginEnd = textStyle.marginEnd
    if (marginStart != undefined && marginStart != 0) {
        contentStack.addSpacer(marginEnd)
    }

    // 重置样式
    resetImgStyle()
}

/*
****************************************************************************
* 右对齐，水平方向排列
****************************************************************************
*/
function alignRightStack(alignmentStack, marginRight) {
    let contentStack = alignmentStack.addStack()
    contentStack.layoutHorizontally()
    contentStack.addSpacer()

    let returnStack = contentStack.addStack()

    // 添加右边距
    if (marginRight != undefined && marginRight != 0) {
        contentStack.addSpacer(marginRight)
    }

    return returnStack
}


/*
****************************************************************************
* 左对齐，水平方向排列
****************************************************************************
*/
function alignLeftStack(alignmentStack, marginLeft) {
    let contentStack = alignmentStack.addStack()
    contentStack.layoutHorizontally()

    let returnStack = contentStack.addStack()
    returnStack.layoutHorizontally()

    // 添加左边距
    if (marginLeft != undefined && marginLeft != 0) {
        returnStack.addSpacer(marginLeft)
    }

    contentStack.addSpacer()
    return returnStack
}

/*
****************************************************************************
* 上对齐，垂直方向排列
****************************************************************************
*/
function alignTopStack(alignmentStack, marginTop) {
    let contentStack = alignmentStack.addStack()
    contentStack.layoutVertically()

    // 添加左边距
    if (marginTop != undefined && marginTop != 0) {
        contentStack.addSpacer(marginTop)
    }

    let returnStack = contentStack.addStack()
    returnStack.layoutVertically()

    contentStack.addSpacer()
    return returnStack
}


/*
****************************************************************************
* 下对齐，垂直方向排列
****************************************************************************
*/
function alignBottomStack(alignmentStack, marginBottom) {
    let contentStack = alignmentStack.addStack()
    contentStack.layoutVertically()
    contentStack.addSpacer()

    let returnStack = contentStack.addStack()

    // 添加下边距
    if (marginBottom != undefined && marginBottom != 0) {
        contentStack.addSpacer(marginBottom)
    }

    return returnStack
}

/*
****************************************************************************
* 水平居中
****************************************************************************
*/
function alignHorizontallyCenterStack(alignmentStack) {
    let returnStack = alignmentStack.addStack()
    returnStack.layoutHorizontally()
    returnStack.centerAlignContent()
    return returnStack
}


/*
****************************************************************************
* 垂直居中
****************************************************************************
*/
function alignVerticallyCenterStack(alignmentStack) {
    let returnStack = alignmentStack.addStack()
    returnStack.layoutVertically()
    returnStack.centerAlignContent()
    return returnStack
}


/*
****************************************************************************
* 网络请求get封装
****************************************************************************
*/
async function getJson(url) {
    const request = new Request(url)
    const defaultHeaders = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    }

    request.url = url
    request.method = 'GET'
    request.headers = defaultHeaders

    const data = await request.loadJSON()

    return data
}


/*
****************************************************************************
* 网络请求获取图片
****************************************************************************
*/
async function getImage(url) {
    const request = new Request(url)
    const data = await request.loadImage()
    return data
}


/*
****************************************************************************
* 图片裁剪相关
****************************************************************************
*/
// Generate an alert with the provided array of options.
async function generateAlert(message, options) {
    let alert = new Alert()
    alert.message = message

    for (const option of options) {
        alert.addAction(option)
    }

    let response = await alert.presentAlert()
    return response
}

// Crop an image into the specified rect.
function cropImage(img, rect) {
    let draw = new DrawContext()
    draw.size = new Size(rect.width, rect.height)
    draw.drawImageAtPoint(img, new Point(-rect.x, -rect.y))
    return draw.getImage()
}

// Pixel sizes and positions for widgets on all supported phones.
function phoneSizes() {
    let phones = {
        "2688": {
            "小号": 507,
            "中号": 1080,
            "大号": 1137,
            "左边": 81,
            "右边": 654,
            "顶部": 228,
            "中间": 858,
            "底部": 1488
        },

        "1792": {
            "小号": 338,
            "中号": 720,
            "大号": 758,
            "左边": 54,
            "右边": 436,
            "顶部": 160,
            "中间": 580,
            "底部": 1000
        },

        "2436": {
            "小号": 465,
            "中号": 987,
            "大号": 1035,
            "左边": 69,
            "右边": 591,
            "顶部": 213,
            "中间": 783,
            "底部": 1353
        },

        "2208": {
            "小号": 471,
            "中号": 1044,
            "大号": 1071,
            "左边": 99,
            "右边": 672,
            "顶部": 114,
            "中间": 696,
            "底部": 1278
        },

        "1334": {
            "小号": 296,
            "中号": 642,
            "大号": 648,
            "左边": 54,
            "右边": 400,
            "顶部": 60,
            "中间": 412,
            "底部": 764
        },

        "1136": {
            "小号": 282,
            "中号": 584,
            "大号": 622,
            "左边": 30,
            "右边": 332,
            "顶部": 59,
            "中间": 399,
            "底部": 399
        }
    }
    return phones
}


/*
****************************************************************************
****************************************************************************
****************************************************************************
*/



