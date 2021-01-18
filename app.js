const history = require('./history');
const statistics = require('./statistics');
const floor2Digits = require('./util').floor2Digits;
const express = require('express');
const app = express();

const target_profit = 3;

const kospi50_arr = [{name : 'KB금융', symbol : '43413'}, {name : 'KT', symbol : '43507'}, {name : 'KT&G', symbol : '43480'}, {name : 'LG', symbol : '43508'}, {name : 'LG Electronics', symbol : '43348'}, {name : 'LG디스플레이', symbol : '43463'}, {name : 'LG생활건강', symbol : '43521'}, {name : 'LG유플러스', symbol : '43492'}, {name : 'LG화학', symbol : '43424'}, {name : 'S-oil', symbol : '43473'}, {name : 'SK Telecom', symbol : '43472'}, {name : 'SK그룹', symbol : '43520'}, {name : 'SK이노베이션', symbol : '43404'}, {name : 'SK하이닉스', symbol : '43430'}, {name : 'Woori Financial', symbol : '1131302'}, {name : '강원랜드', symbol : '43422'}, {name : '고려아연', symbol : '43381'}, {name : '기아차', symbol : '43460'}, {name : '기업은행', symbol : '43542'}, {name : '네이버 주식회사', symbol : '43493'}, {name : '넷마블', symbol : '1010663'}, {name : '롯데쇼핑', symbol : '43383'}, {name : '롯데케미칼', symbol : '43374'}, {name : '삼성SDI', symbol : '43450'}, {name : '삼성물산', symbol : '43477'}, {name : '삼성바이오로직스', symbol : '993256'}, {name : '삼성생명', symbol : '43428'}, {name : '삼성에스디에스', symbol : '948394'}, {name : '삼성전기', symbol : '43350'}, {name : '삼성전자', symbol : '43433'}, {name : '삼성화재해상보험', symbol : '43370'}, {name : '셀트리온', symbol : '979618'}, {name : '신한지주', symbol : '43453'}, {name : '아모레G', symbol : '43443'}, {name : '아모레퍼시픽', symbol : '43416'}, {name : '엔씨소프트', symbol : '43448'}, {name : '이마트', symbol : '44089'}, {name : '카카오', symbol : '979247'}, {name : '코웨이', symbol : '43524'}, {name : '포스코', symbol : '43531'}, {name : '하나금융지주', symbol : '43378'}, {name : '한국전력', symbol : '43525'}, {name : '한국타이어', symbol : '44101'}, {name : '한미사이언스', symbol : '43783'}, {name : '현대건설', symbol : '43371'}, {name : '현대글로비스', symbol : '43379'}, {name : '현대모비스', symbol : '43398'}, {name : '현대제철', symbol : '43400'}, {name : '현대중공업', symbol : '43541'}, {name : '현대차', symbol : '43399'}];
const krx100_arr = [{name : 'BGF', symbol : '940988'}, {name : 'BNK 금융그룹', symbol : '43414'}, {name : 'CJ CGV', symbol : '43992'}, {name : 'CJ ENM', symbol : '979248'}, {name : 'CJ 그룹', symbol : '43499'}, {name : 'CJ대한통운', symbol : '43377'}, {name : 'CJ제일제당', symbol : '43376'}, {name : 'GKL', symbol : '44066'}, {name : 'GS 그룹', symbol : '43497'}, {name : 'GS리테일', symbol : '43751'}, {name : 'Hyundai Robotics', symbol : '1010641'}, {name : 'JYP Ent.', symbol : '979251'}, {name : 'KB금융', symbol : '43413'}, {name : 'KCC', symbol : '43537'}, {name : 'KT', symbol : '43507'}, {name : 'KT&G', symbol : '43480'}, {name : 'LG', symbol : '43508'}, {name : 'LG Electronics', symbol : '43348'}, {name : 'LG디스플레이', symbol : '43463'}, {name : 'LG생활건강', symbol : '43521'}, {name : 'LG유플러스', symbol : '43492'}, {name : 'LG이노텍', symbol : '43465'}, {name : 'LG화학', symbol : '43424'}, {name : 'Lotte', symbol : '43454'}, {name : 'OCI', symbol : '43469'}, {name : 'Posco Chemical', symbol : '979031'}, {name : 'S-oil', symbol : '43473'}, {name : 'SK Telecom', symbol : '43472'}, {name : 'SK그룹', symbol : '43520'}, {name : 'SK머티리얼즈', symbol : '979264'}, {name : 'SK이노베이션', symbol : '43404'}, {name : 'SK하이닉스', symbol : '43430'}, {name : 'Woori Financial', symbol : '1131302'}, {name : '강원랜드', symbol : '43422'}, {name : '고려아연', symbol : '43381'}, {name : '고영', symbol : '979813'}, {name : '금호석유', symbol : '43347'}, {name : '기아차', symbol : '43460'}, {name : '기업은행', symbol : '43542'}, {name : '네이버 주식회사', symbol : '43493'}, {name : '녹십자', symbol : '43503'}, {name : '농심', symbol : '43494'}, {name : '대림산업', symbol : '43456'}, {name : '대한 유화', symbol : '43533'}, {name : '동부화재', symbol : '43455'}, {name : '롯데케미칼', symbol : '43374'}, {name : '메디톡스', symbol : '979729'}, {name : '메리츠종금증권', symbol : '43775'}, {name : '미래에셋대우', symbol : '43441'}, {name : '삼성SDI', symbol : '43450'}, {name : '삼성물산', symbol : '43477'}, {name : '삼성생명', symbol : '43428'}, {name : '삼성에스디에스', symbol : '948394'}, {name : '삼성전기', symbol : '43350'}, {name : '삼성전자', symbol : '43433'}, {name : '삼성증권', symbol : '43407'}, {name : '삼성카드', symbol : '43427'}, {name : '삼성화재해상보험', symbol : '43370'}, {name : '셀트리온', symbol : '979618'}, {name : '신세계', symbol : '43484'}, {name : '신한지주', symbol : '43453'}, {name : '아모레G', symbol : '43443'}, {name : '아모레퍼시픽', symbol : '43416'}, {name : '에스에프에이', symbol : '979505'}, {name : '에스원', symbol : '43495'}, {name : '엔씨소프트', symbol : '43448'}, {name : '영원무역', symbol : '44065'}, {name : '오뚜기', symbol : '43518'}, {name : '오리온', symbol : '1031094'}, {name : '유한양행', symbol : '43532'}, {name : '이마트', symbol : '44089'}, {name : '제일기획', symbol : '43352'}, {name : '카카오', symbol : '979247'}, {name : '컴투스', symbol : '979666'}, {name : '코스맥스', symbol : '940989'}, {name : '코웨이', symbol : '43524'}, {name : '키움증권', symbol : '43955'}, {name : '포스코', symbol : '43531'}, {name : '포스코 대우', symbol : '43535'}, {name : '하나금융지주', symbol : '43378'}, {name : '한국전력', symbol : '43525'}, {name : '한국콜마', symbol : '44102'}, {name : '한국타이어', symbol : '44101'}, {name : '한국투자금융지주', symbol : '43540'}, {name : '한국항공우주', symbol : '43962'}, {name : '한미사이언스', symbol : '43783'}, {name : '한미약품', symbol : '43440'}, {name : '한샘', symbol : '43791'}, {name : '한온시스템', symbol : '43346'}, {name : '한전KPS', symbol : '43964'}, {name : '한화케미칼', symbol : '43457'}, {name : '현대건설', symbol : '43371'}, {name : '현대글로비스', symbol : '43379'}, {name : '현대모비스', symbol : '43398'}, {name : '현대백화점', symbol : '43372'}, {name : '현대제철', symbol : '43400'}, {name : '현대중공업', symbol : '43541'}, {name : '현대차', symbol : '43399'}, {name : '현대해상', symbol : '43590'}, {name : '효성', symbol : '43506'}];
const kb_kstar_etf_arr = [{name : 'KB KSTAR KOSPI 200', symbol : '953389'}, {name : 'KB KSTAR Short-term MSB', symbol : '953392'}, {name : 'KB KBSTAR KOSDAQ150 ETF', symbol : '1031343'}, {name : 'KB KBSTAR Short-term KTB Active', symbol : '1031354'}, {name : 'KB KBSTAR KRX300', symbol : '1073393'}, {name : 'KB KSTAR Credit Bond', symbol : '953382'}, {name : 'KB KBSTAR F-KOSDAQ150 Inverse', symbol : '1031351'}, {name : 'KB KSTAR Top5 Group', symbol : '953394'}, {name : 'KB KBSTAR Mid Small Cap High Dividend', symbol : '1055055'}, {name : 'KB KBSTAR 200 Heavy Industries', symbol : '1056438'}, {name : 'KB KSTAR Korea Treasury Bond', symbol : '953387'}, {name : 'KB KBSTAR 200 Constructions', symbol : '1057214'}, {name : 'KB KSTAR Prime Industry', symbol : '953391'}, {name : 'KB KBSTAR 200 Energy & Chemicals', symbol : '1056436'}, {name : 'KB KBSTAR 200 Steels & Materials', symbol : '1056439'}, {name : 'KB KSTAR Fixed Income Balanced-Derivatives', symbol : '953385'}, {name : 'KB KBSTAR High Dividend', symbol : '1014024'}, {name : 'KB KBSTAR KTB 10Y Futures', symbol : '1077028'}, {name : 'KB KSTAR Exporter Equity', symbol : '953384'}, {name : 'KB KBSTAR KQ High Dividend', symbol : '1031346'}, {name : 'KB KBSTAR Holding Company', symbol : '1056174'}, {name : 'KB KBSTAR 200 Information Technology', symbol : '1056437'}, {name : 'KB KBSTAR 200 Consumer Staples', symbol : '1057215'}, {name : 'KB KBStar Game Industry', symbol : '1089768'}, {name : 'KB KBSTAR 200 Industrials', symbol : '1057213'}, {name : 'KB KBSTAR KTB 3Y Futures Inverse', symbol : '1055118'}, {name : 'KB KBSTAR KTB 10Y Futures Inverse', symbol : '1077031'}, {name : 'KB KSTAR Equity Balanced Equity-Derivatives ', symbol : '953383'}, {name : 'KB KBStar KOSPI', symbol : '1089767'}, {name : 'KB KBSTAR KQ Momentum Value', symbol : '1089538'}, {name : 'KB KBSTAR Mid-Small Cap Momentum LowVol', symbol : '1089537'}, {name : 'KB KBSTAR Mid-Small Cap Momentum Value', symbol : '1089536'}, {name : 'KB KBSTAR KQ Momentum LowVol', symbol : '1089535'}, {name : 'KB KBSTAR ESG SRI', symbol : '1072257'}, {name : 'KB KBSTAR 200 Financials', symbol : '1056435'}, {name : 'KB KBSTAR 200 Consumer Discretionary', symbol : '1057216'}, {name : 'KB KBSTAR China H Futures Inverse', symbol : '1073352'}, {name : 'KB KSTAR Japan Leverage (H)', symbol : '953386'}, {name : 'KB KSTAR Synth-US Oil Gas EP Compa', symbol : '956468'}, {name : 'KB KBSTAR China H-Share Hedged', symbol : '997384'}, {name : 'KB KBSTAR US Treasury Long Bond Futures', symbol : '1014032'}, {name : 'KB KBSTAR US Treasury Long Bond Futures Inverse', symbol : '1014033'}, {name : 'KB KBSTAR US Treasury Long Bond Futures Leverage S', symbol : '1014034'}, {name : 'KB KBSTAR US Treasury Long Bond Futures Inverse 2X', symbol : '1014035'}, {name : 'KB KSTAR China Mainland CSI100 Feeder', symbol : '953381'}];
const kospi100_kosdaq100_arr = [{name:'DSR', symbol: '155660'}

,{name:'GS글로벌', symbol: '001250'}

,{name:'HDC현대산업개발', symbol: '294870'}

,{name:'KG케미칼', symbol: '001390'}

,{name:'LG이노텍', symbol: '011070'}

,{name:'LG전자', symbol: '066570'}

,{name:'LG헬로비전', symbol: '037560'}

,{name:'OCI', symbol: '010060'}

,{name:'S&TC', symbol: '100840'}

,{name:'S&T모티브', symbol: '064960'}

,{name:'SK이노베이션', symbol: '096770'}

,{name:'STX', symbol: '011810'}

,{name:'WISCOM', symbol: '024070'}

,{name:'YG PLUS', symbol: '037270'}

,{name:'갤럭시아에스엠', symbol: '011420'}

,{name:'고려아연', symbol: '010130'}

,{name:'극동유화', symbol: '014530'}

,{name:'까뮤이앤씨', symbol: '013700'}

,{name:'남선알미늄', symbol: '008350'}

,{name:'대덕전자', symbol: '353200'}

,{name:'대영포장', symbol: '014160'}

,{name:'대웅', symbol: '003090'}

,{name:'대한유화', symbol: '006650'}

,{name:'두산', symbol: '000150'}

,{name:'두산밥캣', symbol: '241560'}

,{name:'락앤락', symbol: '115390'}

,{name:'롯데정보통신', symbol: '286940'}

,{name:'마니커', symbol: '027740'}

,{name:'만도', symbol: '204320'}

,{name:'메리츠증권', symbol: '008560'}

,{name:'모두투어리츠', symbol: '204210'}

,{name:'부국증권', symbol: '001270'}

,{name:'삼성SDI', symbol: '006400'}

,{name:'삼성엔지니어링', symbol: '028050'}

,{name:'삼성중공업', symbol: '010140'}

,{name:'삼성출판사', symbol: '068290'}

,{name:'삼성화재해상보험', symbol: '000810'}

,{name:'삼양홀딩스', symbol: '000070'}

,{name:'삼영전자공업', symbol: '005680'}

,{name:'삼영화학공업', symbol: '003720'}

,{name:'상상인증권', symbol: '001290'}

,{name:'선도전기', symbol: '007610'}

,{name:'선진', symbol: '136490'}

,{name:'세방전지', symbol: '004490'}

,{name:'세원셀론텍', symbol: '091090'}

,{name:'신한알파리츠', symbol: '293940'}

,{name:'신한지주', symbol: '055550'}

,{name:'쌍용자동차', symbol: '003620'}

,{name:'에넥스', symbol: '011090'}

,{name:'영화금속', symbol: '012280'}

,{name:'윌비스', symbol: '008600'}

,{name:'유나이티드', symbol: '033270'}

,{name:'인터지스', symbol: '129260'}

,{name:'일성건설', symbol: '013360'}

,{name:'일진다이아', symbol: '081000'}

,{name:'제일약품', symbol: '271980'}

,{name:'제일연마', symbol: '001560'}

,{name:'제일파마홀딩스', symbol: '002620'}

,{name:'조흥', symbol: '002600'}

,{name:'지역난방공사', symbol: '071320'}

,{name:'진도', symbol: '088790'}

,{name:'코오롱인더', symbol: '120110'}

,{name:'키다리스튜디오', symbol: '020120'}

,{name:'태경산업', symbol: '015890'}

,{name:'태양금속공업', symbol: '004100'}

,{name:'포스코강판', symbol: '058430'}

,{name:'필룩스', symbol: '033180'}

,{name:'한국공항', symbol: '005430'}

,{name:'한국종합기술', symbol: '023350'}

,{name:'한국패러랠', symbol: '168490'}

,{name:'한솔로지스틱스', symbol: '009180'}

,{name:'한일철강', symbol: '002220'}

,{name:'한일현대시멘트', symbol: '006390'}

,{name:'한창제지', symbol: '009460'}

,{name:'한화생명', symbol: '088350'}

,{name:'현대건설기계', symbol: '267270'}

,{name:'현대모비스', symbol: '012330'}

,{name:'현대비앤지스틸', symbol: '004560'}

,{name:'현대엘리베이터', symbol: '017800'}

,{name:'현대차증권', symbol: '001500'}

,{name:'현대홈쇼핑', symbol: '057050'}

,{name:'호전실업', symbol: '111110'}

,{name:'EDGC', symbol: '245620'}

,{name:'GST', symbol: '083450'}

,{name:'GS홈쇼핑', symbol: '028150'}

,{name:'IBKS제13호스팩', symbol: '351340'}

,{name:'ITX-AI', symbol: '099520'}

,{name:'JW신약', symbol: '067290'}

,{name:'KB오토시스', symbol: '024120'}

,{name:'KH바텍', symbol: '060720'}

,{name:'SK5호스팩', symbol: '337450'}

,{name:'SK6호스팩', symbol: '340350'}

,{name:'YW', symbol: '051390'}

,{name:'경창산업', symbol: '024910'}

,{name:'고려시멘트', symbol: '198440'}

,{name:'골프존', symbol: '215000'}

,{name:'교보8호스팩', symbol: '307280'}

,{name:'국순당', symbol: '043650'}

,{name:'그리티', symbol: '204020'}

,{name:'나노브릭', symbol: '286750'}

,{name:'네오티스', symbol: '085910'}

,{name:'네이처셀', symbol: '007390'}

,{name:'녹십자셀', symbol: '031390'}

,{name:'뉴인텍', symbol: '012340'}

,{name:'뉴프렉스', symbol: '085670'}

,{name:'대봉엘에스', symbol: '078140'}

,{name:'대신밸런스제9호스팩', symbol: '369370'}

,{name:'대유', symbol: '290380'}

,{name:'대유에이피', symbol: '290120'}

,{name:'대주산업', symbol: '003310'}

,{name:'대한약품', symbol: '023910'}

,{name:'동구바이오제약', symbol: '006620'}

,{name:'동방선기', symbol: '099410'}

,{name:'디에이테크놀로지', symbol: '196490'}

,{name:'디에이피', symbol: '066900'}

,{name:'디엔에이링크', symbol: '127120'}

,{name:'디엔에프', symbol: '092070'}

,{name:'디지틀조선', symbol: '033130'}

,{name:'룽투코리아', symbol: '060240'}

,{name:'링크제니시스', symbol: '219420'}

,{name:'메디톡스', symbol: '086900'}

,{name:'메이슨캐피탈', symbol: '021880'}

,{name:'메탈라이프', symbol: '327260'}

,{name:'모두투어', symbol: '080160'}

,{name:'모비스', symbol: '250060'}

,{name:'모트렉스', symbol: '118990'}

,{name:'미래SCI', symbol: '028040'}

,{name:'미스터블루', symbol: '207760'}

,{name:'미코바이오메드', symbol: '214610'}

,{name:'바디텍메드', symbol: '206640'}

,{name:'바이넥스', symbol: '053030'}

,{name:'브랜드엑스코퍼레이션', symbol: '337930'}

,{name:'삼보판지', symbol: '023600'}

,{name:'삼본전자', symbol: '111870'}

,{name:'삼아제약', symbol: '009300'}

,{name:'상지카일룸', symbol: '042940'}

,{name:'서암기계공업', symbol: '100660'}

,{name:'성창오토텍', symbol: '080470'}

,{name:'세보엠이씨', symbol: '011560'}

,{name:'세종메디칼', symbol: '258830'}

,{name:'세코닉스', symbol: '053450'}

,{name:'셀루메드', symbol: '049180'}

,{name:'셀바스헬스케어', symbol: '208370'}

,{name:'셀트리온제약', symbol: '068760'}

,{name:'소리바다', symbol: '053110'}

,{name:'스튜디오산타클로스', symbol: '204630'}

,{name:'스페코', symbol: '013810'}

,{name:'승일', symbol: '049830'}

,{name:'시스웍', symbol: '269620'}

,{name:'심텍', symbol: '222800'}

,{name:'쌍용정보통신', symbol: '010280'}

,{name:'씨유메디칼', symbol: '115480'}

,{name:'씨케이에이치', symbol: '900120'}

,{name:'아나패스', symbol: '123860'}

,{name:'아바텍', symbol: '149950'}

,{name:'아이센스', symbol: '099190'}

,{name:'아이씨디', symbol: '040910'}

,{name:'아이씨케이', symbol: '068940'}

,{name:'아이오케이', symbol: '078860'}

,{name:'아이원스', symbol: '114810'}

,{name:'아이즈비전', symbol: '031310'}

,{name:'아이티센', symbol: '124500'}

,{name:'알리코제약', symbol: '260660'}

,{name:'알에프세미', symbol: '096610'}

,{name:'알에프텍', symbol: '061040'}

,{name:'애니플러스', symbol: '310200'}

,{name:'어보브반도체', symbol: '102120'}

,{name:'에스아이리소스', symbol: '065420'}

,{name:'에스앤더블류', symbol: '103230'}

,{name:'에스앤에스텍', symbol: '101490'}

,{name:'에스에너지', symbol: '095910'}

,{name:'에스코넥', symbol: '096630'}

,{name:'에쎈테크', symbol: '043340'}

,{name:'에이루트', symbol: '096690'}

,{name:'에이티넘인베스트', symbol: '021080'}

,{name:'엑세스바이오', symbol: '950130'}

,{name:'엑스큐어', symbol: '070300'}

,{name:'엑시콘', symbol: '092870'}

,{name:'엔피케이', symbol: '048830'}

,{name:'엠게임', symbol: '058630'}

,{name:'엠벤처투자', symbol: '019590'}

,{name:'엠씨넥스', symbol: '097520'}

,{name:'영화테크', symbol: '265560'}

,{name:'오공', symbol: '045060'}

,{name:'오스템임플란트', symbol: '048260'}

,{name:'오킨스전자', symbol: '080580'}

,{name:'오픈베이스', symbol: '049480'}

,{name:'옵티시스', symbol: '109080'}

,{name:'와이지-원', symbol: '019210'}

,{name:'우리바이오', symbol: '082850'}

,{name:'원익QnC', symbol: '074600'}

,{name:'원익큐브', symbol: '014190'}

,{name:'원풍물산', symbol: '008290'}

,{name:'웨이브일렉트로', symbol: '095270'}

,{name:'웰크론', symbol: '065950'}

,{name:'위지트', symbol: '036090'}

,{name:'유니온커뮤니티', symbol: '203450'}

,{name:'유니테크노', symbol: '241690'}

,{name:'유비쿼스홀딩스', symbol: '078070'}

,{name:'유신', symbol: '054930'}

,{name:'유안타제5호스팩', symbol: '336060'}

,{name:'유안타제7호스팩', symbol: '367460'}

,{name:'유진스팩5호', symbol: '331380'}

,{name:'유테크', symbol: '178780'}

,{name:'유티아이', symbol: '179900'}

,{name:'이스트소프트', symbol: '047560'}

,{name:'이스트아시아홀딩스', symbol: '900110'}

,{name:'이엠넷', symbol: '123570'}

,{name:'이지바이오', symbol: '353810'}

,{name:'이지웰', symbol: '090850'}

,{name:'인베니아', symbol: '079950'}

,{name:'인텍플러스', symbol: '064290'}

,{name:'자비스', symbol: '254120'}

,{name:'자이글', symbol: '234920'}

,{name:'장원테크', symbol: '174880'}

,{name:'정상제이엘에스', symbol: '040420'}

,{name:'제우스', symbol: '079370'}

,{name:'제이엠티', symbol: '094970'}

,{name:'제일제강', symbol: '023440'}

,{name:'제주반도체', symbol: '080220'}

,{name:'젬백스', symbol: '082270'}

,{name:'조아제약', symbol: '034940'}

,{name:'주성엔지니어링', symbol: '036930'}

,{name:'지엔씨에너지', symbol: '119850'}

,{name:'지엔코', symbol: '065060'}

,{name:'캐스텍코리아', symbol: '071850'}

,{name:'케이비제20호스팩', symbol: '342550'}

,{name:'케이피엠테크', symbol: '042040'}

,{name:'케이피티유', symbol: '054410'}

,{name:'켄코아에어로스페이스', symbol: '274090'}

,{name:'코렌', symbol: '078650'}

,{name:'코프라', symbol: '126600'}

,{name:'클리노믹스', symbol: '352770'}

,{name:'키네마스터', symbol: '139670'}

,{name:'트루윈', symbol: '105550'}

,{name:'특수건설', symbol: '026150'}

,{name:'티앤알바이오팹', symbol: '246710'}

,{name:'티에스이', symbol: '131290'}

,{name:'파라텍', symbol: '033540'}

,{name:'파세코', symbol: '037070'}

,{name:'파커스', symbol: '065690'}

,{name:'패션플랫폼', symbol: '225590'}

,{name:'푸드웰', symbol: '005670'}

,{name:'프로스테믹스', symbol: '203690'}

,{name:'프리시젼바이오', symbol: '335810'}

,{name:'피델릭스', symbol: '032580'}

,{name:'피에스엠씨', symbol: '024850'}

,{name:'하나금융15호스팩', symbol: '341160'}

,{name:'하이즈항공', symbol: '221840'}

,{name:'한국맥널티', symbol: '222980'}

,{name:'한국코퍼레이션', symbol: '050540'}

,{name:'한양디지텍', symbol: '078350'}

,{name:'한일진공', symbol: '123840'}

,{name:'한일화학', symbol: '007770'}

,{name:'해성산업', symbol: '034810'}

,{name:'현대바이오', symbol: '048410'}

,{name:'화성밸브', symbol: '039610'}

,{name:'휴맥스', symbol: '115160'}

,{name:'흥국', symbol: '010240'}

,{name:'나눔테크', symbol: '244880'}

,{name:'다원넥스뷰', symbol: '323350'}

,{name:'다이노나', symbol: '086080'}

,{name:'다이오진', symbol: '271850'}

,{name:'로보쓰리', symbol: '238500'}

,{name:'선바이오', symbol: '067370'}

,{name:'씨앗', symbol: '103660'}

,{name:'에스알바이오텍', symbol: '270210'}

,{name:'엘리비젼', symbol: '276240'}

,{name:'유투바이오', symbol: '221800'}

,{name:'이도바이오', symbol: '336040'}

,{name:'전우정밀', symbol: '120780'}

,{name:'진코스텍', symbol: '250030'}

,{name:'큐엠씨', symbol: '136660'}

,{name:'티티씨디펜스', symbol: '309900'}

,{name:'폭스소프트', symbol: '354230'}

,{name:'CJ CGV', symbol: '079160'}

,{name:'CJ제일제당', symbol: '097950'}

,{name:'HDC현대EP', symbol: '089470'}

,{name:'JW홀딩스', symbol: '096760'}

,{name:'KB금융', symbol: '105560'}

,{name:'KC코트렐', symbol: '119650'}

,{name:'SG충방', symbol: '001380'}

,{name:'금강공업', symbol: '014280'}

,{name:'금호산업', symbol: '002990'}

,{name:'금호전기', symbol: '001210'}

,{name:'기업은행', symbol: '024110'}

,{name:'남성', symbol: '004270'}

,{name:'넷마블', symbol: '251270'}

,{name:'대구백화점', symbol: '006370'}

,{name:'대우건설', symbol: '047040'}

,{name:'대원제약', symbol: '003220'}

,{name:'대한방직', symbol: '001070'}

,{name:'대한제당', symbol: '001790'}

,{name:'대한해운', symbol: '005880'}

,{name:'덕양산업', symbol: '024900'}

,{name:'동원금속', symbol: '018500'}

,{name:'두산인프라코어', symbol: '042670'}

,{name:'디씨엠', symbol: '024090'}

,{name:'디티알오토모티브', symbol: '007340'}

,{name:'롯데손해보험', symbol: '000400'}

,{name:'롯데제과', symbol: '280360'}

,{name:'롯데칠성음료', symbol: '005300'}

,{name:'롯데케미칼', symbol: '011170'}

,{name:'롯데하이마트', symbol: '071840'}

,{name:'미원홀딩스', symbol: '107590'}

,{name:'백산', symbol: '035150'}

,{name:'보락', symbol: '002760'}

,{name:'사조대림', symbol: '003960'}

,{name:'사조동아원', symbol: '008040'}

,{name:'삼양식품', symbol: '003230'}

,{name:'서원', symbol: '021050'}

,{name:'세방', symbol: '004360'}

,{name:'세아홀딩스', symbol: '058650'}

,{name:'세이브존I&C', symbol: '067830'}

,{name:'신송홀딩스', symbol: '006880'}

,{name:'신일전자', symbol: '002700'}

,{name:'신풍제약', symbol: '019170'}

,{name:'써니전자', symbol: '004770'}

,{name:'아이마켓코리아', symbol: '122900'}

,{name:'아이에이치큐', symbol: '003560'}

,{name:'에이블씨엔씨', symbol: '078520'}

,{name:'엔씨소프트', symbol: '036570'}

,{name:'영보화학', symbol: '014440'}

,{name:'영진약품', symbol: '003520'}

,{name:'영풍', symbol: '000670'}

,{name:'유니온머티리얼', symbol: '047400'}

,{name:'유유제약', symbol: '000220'}

,{name:'유한양행', symbol: '000100'}

,{name:'이마트', symbol: '139480'}

,{name:'이수화학', symbol: '005950'}

,{name:'이스타코', symbol: '015020'}

,{name:'인천도시가스', symbol: '034590'}

,{name:'일정실업', symbol: '008500'}

,{name:'종근당홀딩스', symbol: '001630'}

,{name:'지엠비코리아', symbol: '013870'}

,{name:'진원생명과학', symbol: '011000'}

,{name:'컨버즈', symbol: '109070'}

,{name:'케이씨텍', symbol: '281820'}

,{name:'코리아써키트', symbol: '007810'}

,{name:'코스모화학', symbol: '005420'}

,{name:'코아스', symbol: '071950'}

,{name:'코오롱플라스틱', symbol: '138490'}

,{name:'쿠쿠홀딩스', symbol: '192400'}

,{name:'큐로', symbol: '015590'}

,{name:'티비에이치글로벌', symbol: '084870'}

,{name:'포스코케미칼', symbol: '003670'}

,{name:'하이트론씨스템즈', symbol: '019490'}

,{name:'한국금융지주', symbol: '071050'}

,{name:'한국전자홀딩스', symbol: '006200'}

,{name:'한국타이어앤테크놀로지', symbol: '161390'}

,{name:'한국토지신탁', symbol: '034830'}

,{name:'한국특수형강', symbol: '007280'}

,{name:'한화솔루션', symbol: '009830'}

,{name:'해태제과식품', symbol: '101530'}

,{name:'현대에너지솔루션', symbol: '322000'}

,{name:'현대위아', symbol: '011210'}

,{name:'현대코퍼레이션홀딩스', symbol: '227840'}

,{name:'호텔신라', symbol: '008770'}

,{name:'화승인더스트리', symbol: '006060'}

,{name:'화천기공', symbol: '000850'}

,{name:'환인제약', symbol: '016580'}

,{name:'효성', symbol: '004800'}

,{name:'효성화학', symbol: '298000'}

,{name:'흥아해운', symbol: '003280'}

,{name:'APS홀딩스', symbol: '054620'}

,{name:'CJ ENM', symbol: '035760'}

,{name:'CMG제약', symbol: '058820'}

,{name:'CS', symbol: '065770'}

,{name:'CSA 코스믹', symbol: '083660'}

,{name:'DB금융스팩8호', symbol: '367340'}

,{name:'EG', symbol: '037370'}

,{name:'HRS', symbol: '036640'}

,{name:'NICE평가정보', symbol: '030190'}

,{name:'PN풍년', symbol: '024940'}

,{name:'SCI평가정보', symbol: '036120'}

,{name:'SM C&C', symbol: '048550'}

,{name:'TS트릴리온', symbol: '317240'}

,{name:'UCI', symbol: '038340'}

,{name:'감마누', symbol: '192410'}

,{name:'강스템바이오텍', symbol: '217730'}

,{name:'게임빌', symbol: '063080'}

,{name:'경남바이오파마', symbol: '044480'}

,{name:'경남제약헬스케어', symbol: '223310'}

,{name:'고영', symbol: '098460'}

,{name:'광림', symbol: '014200'}

,{name:'국영지앤엠', symbol: '006050'}

,{name:'나노엔텍', symbol: '039860'}

,{name:'나이벡', symbol: '138610'}

,{name:'남화토건', symbol: '091590'}

,{name:'네스엠', symbol: '056000'}

,{name:'네오팜', symbol: '092730'}

,{name:'넥스턴', symbol: '089140'}

,{name:'넥스틴', symbol: '348210'}

,{name:'넵튠', symbol: '217270'}

,{name:'녹원씨엔아이', symbol: '065560'}

,{name:'누리텔레콤', symbol: '040160'}

,{name:'뉴파워프라즈마', symbol: '144960'}

,{name:'대성파인텍', symbol: '104040'}

,{name:'대아티아이', symbol: '045390'}

,{name:'대주전자재료', symbol: '078600'}

,{name:'대창솔루션', symbol: '096350'}

,{name:'덕산네오룩스', symbol: '213420'}

,{name:'데브시스터즈', symbol: '194480'}

,{name:'동국S&C', symbol: '100130'}

,{name:'동아엘텍', symbol: '088130'}

,{name:'디알텍', symbol: '214680'}

,{name:'디엠티', symbol: '134580'}

,{name:'디오', symbol: '039840'}

,{name:'딜리', symbol: '131180'}

,{name:'럭슬', symbol: '033600'}

,{name:'레드캡투어', symbol: '038390'}

,{name:'레이언스', symbol: '228850'}

,{name:'로보로보', symbol: '215100'}

,{name:'매일홀딩스', symbol: '005990'}

,{name:'매직마이크로', symbol: '127160'}

,{name:'머큐리', symbol: '100590'}

,{name:'메디앙스', symbol: '014100'}

,{name:'메타바이오메드', symbol: '059210'}

,{name:'멕아이씨에스', symbol: '058110'}

,{name:'무림SP', symbol: '001810'}

,{name:'미래에셋대우스팩3호', symbol: '328380'}

,{name:'미래에셋벤처투자', symbol: '100790'}

,{name:'부스타', symbol: '008470'}

,{name:'비즈니스온', symbol: '138580'}

,{name:'비트컴퓨터', symbol: '032850'}

,{name:'사람인에이치알', symbol: '143240'}

,{name:'삼륭물산', symbol: '014970'}

,{name:'삼양옵틱스', symbol: '225190'}

,{name:'삼영이엔씨', symbol: '065570'}

,{name:'삼일', symbol: '032280'}

,{name:'삼일기업공사', symbol: '002290'}

,{name:'삼지전자', symbol: '037460'}

,{name:'삼진', symbol: '032750'}

,{name:'삼화네트웍스', symbol: '046390'}

,{name:'상보', symbol: '027580'}

,{name:'상신이디피', symbol: '091580'}

,{name:'서린바이오', symbol: '038070'}

,{name:'서호전기', symbol: '065710'}

,{name:'세경하이테크', symbol: '148150'}

,{name:'세명전기', symbol: '017510'}

,{name:'셀바스AI', symbol: '108860'}

,{name:'손오공', symbol: '066910'}

,{name:'솔루에타', symbol: '154040'}

,{name:'슈프리마', symbol: '236200'}

,{name:'스튜디오드래곤', symbol: '253450'}

,{name:'신라에스지', symbol: '025870'}

,{name:'신라젠', symbol: '215600'}

,{name:'신영스팩5호', symbol: '323280'}

,{name:'신한제6호스팩', symbol: '333050'}

,{name:'싸이토젠', symbol: '217330'}

,{name:'아가방컴퍼니', symbol: '013990'}

,{name:'아래스', symbol: '050320'}

,{name:'아모텍', symbol: '052710'}

,{name:'아미코젠', symbol: '092040'}

,{name:'아이에이', symbol: '038880'}

,{name:'아이에이네트웍스', symbol: '123010'}

,{name:'액트로', symbol: '290740'}

,{name:'앱코', symbol: '129890'}

,{name:'에스에스알', symbol: '275630'}

,{name:'에스제이그룹', symbol: '306040'}

,{name:'에스제이케이', symbol: '080440'}

,{name:'에스티팜', symbol: '237690'}

,{name:'에이스토리', symbol: '241840'}

,{name:'에이씨티', symbol: '138360'}

,{name:'에프알텍', symbol: '073540'}

,{name:'에프에스티', symbol: '036810'}

,{name:'엘앤케이바이오', symbol: '156100'}

,{name:'엠에프엠코리아', symbol: '323230'}

,{name:'영신금속', symbol: '007530'}

,{name:'예림당', symbol: '036000'}

,{name:'오르비텍', symbol: '046120'}

,{name:'오성첨단소재', symbol: '052420'}

,{name:'우리손에프앤지', symbol: '073560'}

,{name:'우림기계', symbol: '101170'}

,{name:'우수AMS', symbol: '066590'}

,{name:'원일특강', symbol: '012620'}

,{name:'윈하이텍', symbol: '192390'}

,{name:'윌링스', symbol: '313760'}

,{name:'유니테스트', symbol: '086390'}

,{name:'유바이오로직스', symbol: '206650'}

,{name:'유안타제6호스팩', symbol: '340360'}

,{name:'육일씨엔에쓰', symbol: '191410'}

,{name:'이글루시큐리티', symbol: '067920'}

,{name:'이글벳', symbol: '044960'}

,{name:'이녹스', symbol: '088390'}

,{name:'이랜시스', symbol: '264850'}

,{name:'이베스트스팩5호', symbol: '349720'}

,{name:'이에스에이', symbol: '052190'}

,{name:'이엠앤아이', symbol: '083470'}

,{name:'이엠텍', symbol: '091120'}

,{name:'이즈미디어', symbol: '181340'}

,{name:'이지케어텍', symbol: '099750'}

,{name:'인바디', symbol: '041830'}

,{name:'인선이엔티', symbol: '060150'}

,{name:'인포마크', symbol: '175140'}

,{name:'인포바인', symbol: '115310'}

,{name:'잉크테크', symbol: '049550'}

,{name:'전진바이오팜', symbol: '110020'}

,{name:'정다운', symbol: '208140'}

,{name:'제놀루션', symbol: '225220'}

,{name:'제이스텍', symbol: '090470'}

,{name:'제이엘케이', symbol: '322510'}

,{name:'제일바이오', symbol: '052670'}

,{name:'젬백스지오', symbol: '041590'}

,{name:'조이맥스', symbol: '101730'}

,{name:'조이시티', symbol: '067000'}

,{name:'줌인터넷', symbol: '239340'}

,{name:'지니뮤직', symbol: '043610'}

,{name:'지니언스', symbol: '263860'}

,{name:'지란지교시큐리티', symbol: '208350'}

,{name:'지스마트글로벌', symbol: '114570'}

,{name:'참좋은여행', symbol: '094850'}

,{name:'천보', symbol: '278280'}

,{name:'초록뱀', symbol: '047820'}

,{name:'컴투스', symbol: '078340'}

,{name:'케이비제19호스팩', symbol: '330990'}

,{name:'케이씨피드', symbol: '025880'}

,{name:'케이엔더블유', symbol: '105330'}

,{name:'코데즈컴바인', symbol: '047770'}

,{name:'코리아센터', symbol: '290510'}

,{name:'코메론', symbol: '049430'}

,{name:'코미팜', symbol: '041960'}

,{name:'코아시아', symbol: '045970'}

,{name:'코오롱생명과학', symbol: '102940'}

,{name:'코웰패션', symbol: '033290'}

,{name:'코위버', symbol: '056360'}

,{name:'큐브엔터', symbol: '182360'}

,{name:'크로바하이텍', symbol: '043590'}

,{name:'크리스탈지노믹스', symbol: '083790'}

,{name:'클리오', symbol: '237880'}

,{name:'키움제5호스팩', symbol: '311270'}

,{name:'테고사이언스', symbol: '191420'}

,{name:'테라사이언스', symbol: '073640'}

,{name:'테라젠이텍스', symbol: '066700'}

,{name:'테스나', symbol: '131970'}

,{name:'티에스아이', symbol: '277880'}

,{name:'파루', symbol: '043200'}

,{name:'파멥신', symbol: '208340'}

,{name:'파수', symbol: '150900'}

,{name:'파인디지털', symbol: '038950'}

,{name:'팬엔터테인먼트', symbol: '068050'}

,{name:'펄어비스', symbol: '263750'}

,{name:'펌텍코리아', symbol: '251970'}

,{name:'풍강', symbol: '093380'}

,{name:'플레이디', symbol: '237820'}

,{name:'피앤이솔루션', symbol: '131390'}

,{name:'피에스텍', symbol: '002230'}

,{name:'피엔티', symbol: '137400'}

,{name:'핌스', symbol: '347770'}

,{name:'하나마이크론', symbol: '067310'}

,{name:'한국경제TV', symbol: '039340'}

,{name:'한국기업평가', symbol: '034950'}

,{name:'한국바이오젠', symbol: '318000'}

,{name:'한국비엔씨', symbol: '256840'}

,{name:'한국아트라스비엑스', symbol: '023890'}

,{name:'한국알콜', symbol: '017890'}

,{name:'한국전자금융', symbol: '063570'}

,{name:'한국정보인증', symbol: '053300'}

,{name:'한국정보통신', symbol: '025770'}

,{name:'한국팩키지', symbol: '037230'}

,{name:'한글과컴퓨터', symbol: '030520'}

,{name:'한일단조', symbol: '024740'}

,{name:'한컴위드', symbol: '054920'}

,{name:'한탑', symbol: '002680'}

,{name:'현진소재', symbol: '053660'}

,{name:'형지I&C', symbol: '011080'}

,{name:'휴네시온', symbol: '290270'}

,{name:'휴맥스홀딩스', symbol: '028080'}

,{name:'흥국에프엔비', symbol: '189980'}

,{name:'구스앤홈', symbol: '329050'}

,{name:'노드메이슨', symbol: '317860'}

,{name:'대주이엔티', symbol: '114920'}

,{name:'디피코', symbol: '163430'}

,{name:'래몽래인', symbol: '200350'}

,{name:'메디안디노스틱', symbol: '233250'}

,{name:'미애부', symbol: '225850'}

,{name:'바이오시네틱스', symbol: '281310'}

,{name:'바이옵트로', symbol: '222160'}

,{name:'비플라이소프트', symbol: '148780'}

,{name:'썬테크', symbol: '217320'}

,{name:'앙츠', symbol: '267810'}

,{name:'에이치엔에스하이텍', symbol: '044990'}

,{name:'오션스톤', symbol: '329020'}

,{name:'이노벡스', symbol: '279060'}

,{name:'테크엔', symbol: '308700'}

,{name:'테크트랜스', symbol: '258050'}

,{name:'티케이씨', symbol: '191600'}

,{name:'틸론', symbol: '217880'}

,{name:'휴럼', symbol: '284420'}

,{name:'BGF리테일', symbol: '282330'}

,{name:'BNK금융지주', symbol: '138930'}

,{name:'DRB동일', symbol: '004840'}

,{name:'GS건설', symbol: '006360'}

,{name:'HDC아이콘트롤스', symbol: '039570'}

,{name:'KPX케미칼', symbol: '025000'}

,{name:'KTis', symbol: '058860'}

,{name:'LG상사', symbol: '001120'}

,{name:'MH에탄올', symbol: '023150'}

,{name:'SBS', symbol: '034120'}

,{name:'SBS미디어홀딩스', symbol: '101060'}

,{name:'SK텔레콤', symbol: '017670'}

,{name:'강원랜드', symbol: '035250'}

,{name:'교보증권', symbol: '030610'}

,{name:'국제약품', symbol: '002720'}

,{name:'금양', symbol: '001570'}

,{name:'넥센타이어', symbol: '002350'}

,{name:'녹십자홀딩스', symbol: '005250'}

,{name:'농심홀딩스', symbol: '072710'}

,{name:'다스코', symbol: '058730'}

,{name:'대교', symbol: '019680'}

,{name:'대림건설', symbol: '001880'}

,{name:'대림산업', symbol: '000210'}

,{name:'대웅제약', symbol: '069620'}

,{name:'더존비즈온', symbol: '012510'}

,{name:'덕성', symbol: '004830'}

,{name:'동방아그로', symbol: '007590'}

,{name:'동서', symbol: '026960'}

,{name:'동성코퍼레이션', symbol: '102260'}

,{name:'동아쏘시오홀딩스', symbol: '000640'}

,{name:'동양', symbol: '001520'}

,{name:'동양생명', symbol: '082640'}

,{name:'동원산업', symbol: '006040'}

,{name:'디아이', symbol: '003160'}

,{name:'디와이', symbol: '013570'}

,{name:'디피씨', symbol: '026890'}

,{name:'롯데정밀화학', symbol: '004000'}

,{name:'롯데푸드', symbol: '002270'}

,{name:'맥쿼리인프라', symbol: '088980'}

,{name:'메타랩스', symbol: '090370'}

,{name:'명문제약', symbol: '017180'}

,{name:'모토닉', symbol: '009680'}

,{name:'미래에셋맵스리츠', symbol: '357250'}

,{name:'미원화학', symbol: '134380'}

,{name:'범양건영', symbol: '002410'}

,{name:'베트남개발1', symbol: '096300'}

,{name:'빙그레', symbol: '005180'}

,{name:'삼성바이오로직스', symbol: '207940'}

,{name:'삼성에스디에스', symbol: '018260'}

,{name:'삼성증권', symbol: '016360'}

,{name:'삼성카드', symbol: '029780'}

,{name:'삼양통상', symbol: '002170'}

,{name:'삼영무역', symbol: '002810'}

,{name:'삼정펄프', symbol: '009770'}

,{name:'샘표식품', symbol: '248170'}

,{name:'서연이화', symbol: '200880'}

,{name:'성보화학', symbol: '003080'}

,{name:'세아제강', symbol: '306200'}

,{name:'센트랄모텍', symbol: '308170'}

,{name:'송원산업', symbol: '004430'}

,{name:'신성이엔지', symbol: '011930'}

,{name:'신세계인터내셔날', symbol: '031430'}

,{name:'신세계푸드', symbol: '031440'}

,{name:'신화실업', symbol: '001770'}

,{name:'씨아이테크', symbol: '004920'}

,{name:'아세아시멘트', symbol: '183190'}

,{name:'애경산업', symbol: '018250'}

,{name:'에이플러스에셋', symbol: '244920'}

,{name:'엔에이치엔', symbol: '181710'}

,{name:'유니켐', symbol: '011330'}

,{name:'유화증권', symbol: '003460'}

,{name:'이구산업', symbol: '025820'}

,{name:'이월드', symbol: '084680'}

,{name:'일성신약', symbol: '003120'}

,{name:'제이에스코퍼레이션', symbol: '194370'}

,{name:'제이준코스메틱', symbol: '025620'}

,{name:'조비', symbol: '001550'}

,{name:'조선선재', symbol: '120030'}

,{name:'종근당바이오', symbol: '063160'}

,{name:'지누스', symbol: '013890'}

,{name:'진양화학', symbol: '051630'}

,{name:'케이탑리츠', symbol: '145270'}

,{name:'코람코에너지리츠', symbol: '357120'}

,{name:'코스모신소재', symbol: '005070'}

,{name:'코웨이', symbol: '021240'}

,{name:'쿠쿠홈시스', symbol: '284740'}

,{name:'키위미디어그룹', symbol: '012170'}

,{name:'태평양물산', symbol: '007980'}

,{name:'테이팩스', symbol: '055490'}

,{name:'텔코웨어', symbol: '078000'}

,{name:'티와이홀딩스', symbol: '363280'}

,{name:'팜스코', symbol: '036580'}

,{name:'퍼시스', symbol: '016800'}

,{name:'풍산홀딩스', symbol: '005810'}

,{name:'하이스틸', symbol: '071090'}

,{name:'하이트진로', symbol: '000080'}

,{name:'한국석유공업', symbol: '004090'}

,{name:'한국수출포장공업', symbol: '002200'}

,{name:'한국자산신탁', symbol: '123890'}

,{name:'한국주강', symbol: '025890'}

,{name:'한국콜마홀딩스', symbol: '024720'}

,{name:'한국테크놀로지그룹', symbol: '000240'}

,{name:'한국항공우주', symbol: '047810'}

,{name:'한라홀딩스', symbol: '060980'}

,{name:'한미사이언스', symbol: '008930'}

,{name:'한샘', symbol: '009240'}

,{name:'한솔홀딩스', symbol: '004150'}

,{name:'한신기계공업', symbol: '011700'}

,{name:'한화', symbol: '000880'}

,{name:'한화에어로스페이스', symbol: '012450'}

,{name:'현대자동차', symbol: '005380'}

,{name:'현대퓨처넷', symbol: '126560'}

,{name:'효성 ITX', symbol: '094280'}

,{name:'휴니드테크놀러지스', symbol: '005870'}

,{name:'EMW', symbol: '079190'}

,{name:'JTC', symbol: '950170'}

,{name:'KCC건설', symbol: '021320'}

,{name:'KCI', symbol: '036670'}

,{name:'KD', symbol: '044180'}

,{name:'KG ETS', symbol: '151860'}

,{name:'KG모빌리언스', symbol: '046440'}

,{name:'NEW', symbol: '160550'}

,{name:'SBI핀테크솔루션즈', symbol: '950110'}

,{name:'SGA솔루션즈', symbol: '184230'}

,{name:'SM Life Design', symbol: '063440'}

,{name:'W홀딩컴퍼니', symbol: '052300'}

,{name:'교보9호스팩', symbol: '331520'}

,{name:'국전약품', symbol: '307750'}

,{name:'나노신소재', symbol: '121600'}

,{name:'나인테크', symbol: '267320'}

,{name:'네패스아크', symbol: '330860'}

,{name:'넥스트아이', symbol: '137940'}

,{name:'넥슨지티', symbol: '041140'}

,{name:'넷게임즈', symbol: '225570'}

,{name:'노터스', symbol: '278650'}

,{name:'누리플랜', symbol: '069140'}

,{name:'뉴프라이드', symbol: '900100'}

,{name:'다산네트웍스', symbol: '039560'}

,{name:'다원시스', symbol: '068240'}

,{name:'대명소노시즌', symbol: '007720'}

,{name:'대성미생물', symbol: '036480'}

,{name:'대원산업', symbol: '005710'}

,{name:'더블유에스아이', symbol: '299170'}

,{name:'덕신하우징', symbol: '090410'}

,{name:'데일리블록체인', symbol: '139050'}

,{name:'덴티스', symbol: '261200'}

,{name:'동신건설', symbol: '025950'}

,{name:'동일기연', symbol: '032960'}

,{name:'듀오백', symbol: '073190'}

,{name:'드림어스컴퍼니', symbol: '060570'}

,{name:'디지아이', symbol: '043360'}

,{name:'디지털대성', symbol: '068930'}

,{name:'디티앤씨', symbol: '187220'}

,{name:'라이브플렉스', symbol: '050120'}

,{name:'램테크놀러지', symbol: '171010'}

,{name:'레고켐바이오', symbol: '141080'}

,{name:'레몬', symbol: '294140'}

,{name:'로보스타', symbol: '090360'}

,{name:'리드코프', symbol: '012700'}

,{name:'메디콕스', symbol: '054180'}

,{name:'메디포스트', symbol: '078160'}

,{name:'미래컴퍼니', symbol: '049950'}

,{name:'바이브컴퍼니', symbol: '301300'}

,{name:'바이오니아', symbol: '064550'}

,{name:'베뉴지', symbol: '019010'}

,{name:'베셀', symbol: '177350'}

,{name:'보라티알', symbol: '250000'}

,{name:'부방', symbol: '014470'}

,{name:'브리지텍', symbol: '064480'}

,{name:'삼진엘앤디', symbol: '054090'}

,{name:'삼천리자전거', symbol: '024950'}

,{name:'삼현철강', symbol: '017480'}

,{name:'서산', symbol: '079650'}

,{name:'서진오토모티브', symbol: '122690'}

,{name:'성우테크론', symbol: '045300'}

,{name:'성우하이텍', symbol: '015750'}

,{name:'세운메디칼', symbol: '100700'}

,{name:'세종텔레콤', symbol: '036630'}

,{name:'세진티에스', symbol: '067770'}

,{name:'솔고바이오', symbol: '043100'}

,{name:'솔본', symbol: '035610'}

,{name:'슈펙스비앤피', symbol: '058530'}

,{name:'슈피겐코리아', symbol: '192440'}

,{name:'스카이이앤엠', symbol: '131100'}

,{name:'스킨앤스킨', symbol: '159910'}

,{name:'시공테크', symbol: '020710'}

,{name:'시그네틱스', symbol: '033170'}

,{name:'시큐브', symbol: '131090'}

,{name:'신도기연', symbol: '290520'}

,{name:'신테카바이오', symbol: '226330'}

,{name:'실리콘웍스', symbol: '108320'}

,{name:'쎄노텍', symbol: '222420'}

,{name:'쎄미시스코', symbol: '136510'}

,{name:'쎄트렉아이', symbol: '099320'}

,{name:'씨엠에스에듀', symbol: '225330'}

,{name:'씨큐브', symbol: '101240'}

,{name:'아비코전자', symbol: '036010'}

,{name:'아이디피', symbol: '332370'}

,{name:'아이톡시', symbol: '052770'}

,{name:'아진산업', symbol: '013310'}

,{name:'아프리카TV', symbol: '067160'}

,{name:'알티캐스트', symbol: '085810'}

,{name:'애니젠', symbol: '196300'}

,{name:'액션스퀘어', symbol: '205500'}

,{name:'앤디포스', symbol: '238090'}

,{name:'앱클론', symbol: '174900'}

,{name:'에스와이', symbol: '109610'}

,{name:'에스트래픽', symbol: '234300'}

,{name:'에스퓨얼셀', symbol: '288620'}

,{name:'에이디칩스', symbol: '054630'}

,{name:'에이비엘바이오', symbol: '298380'}

,{name:'에이스침대', symbol: '003800'}

,{name:'에이아이비트', symbol: '039230'}

,{name:'에이치시티', symbol: '072990'}

,{name:'에이텍티앤', symbol: '224110'}

,{name:'에이팸', symbol: '073070'}

,{name:'엑셈', symbol: '205100'}

,{name:'엔브이에이치코리아', symbol: '067570'}

,{name:'엔지켐생명과학', symbol: '183490'}

,{name:'엔케이맥스', symbol: '182400'}

,{name:'엔텔스', symbol: '069410'}

,{name:'엘디티', symbol: '096870'}

,{name:'엘컴텍', symbol: '037950'}

,{name:'영림원소프트랩', symbol: '060850'}

,{name:'예스티', symbol: '122640'}

,{name:'오스테오닉', symbol: '226400'}

,{name:'오텍', symbol: '067170'}

,{name:'와이즈버즈', symbol: '273060'}

,{name:'원익머트리얼즈', symbol: '104830'}

,{name:'원풍', symbol: '008370'}

,{name:'웹젠', symbol: '069080'}

,{name:'위닉스', symbol: '044340'}

,{name:'위메이드', symbol: '112040'}

,{name:'유비벨록스', symbol: '089850'}

,{name:'유비쿼스', symbol: '264450'}

,{name:'유안타제4호스팩', symbol: '313750'}

,{name:'유진테크', symbol: '084370'}

,{name:'이건홀딩스', symbol: '039020'}

,{name:'이노와이어리스', symbol: '073490'}

,{name:'이녹스첨단소재', symbol: '272290'}

,{name:'이랜텍', symbol: '054210'}

,{name:'이미지스', symbol: '115610'}

,{name:'이수앱지스', symbol: '086890'}

,{name:'인산가', symbol: '277410'}

,{name:'인성정보', symbol: '033230'}

,{name:'인탑스', symbol: '049070'}

,{name:'인터파크', symbol: '035080'}

,{name:'자안', symbol: '221610'}

,{name:'재영솔루텍', symbol: '049630'}

,{name:'제낙스', symbol: '065620'}

,{name:'제이앤티씨', symbol: '204270'}

,{name:'제이티', symbol: '089790'}

,{name:'지더블유바이텍', symbol: '036180'}

,{name:'진바이오텍', symbol: '086060'}

,{name:'진성티이씨', symbol: '036890'}

,{name:'카이노스메드', symbol: '284620'}

,{name:'캐리소프트', symbol: '317530'}

,{name:'캔서롭', symbol: '180400'}

,{name:'캠시스', symbol: '050110'}

,{name:'케이비제18호스팩', symbol: '323940'}

,{name:'케이엠더블유', symbol: '032500'}

,{name:'케이피에프', symbol: '024880'}

,{name:'코닉글로리', symbol: '094860'}

,{name:'코드네이처', symbol: '078940'}

,{name:'코디엠', symbol: '224060'}

,{name:'코리아에셋투자증권', symbol: '190650'}

,{name:'코미코', symbol: '183300'}

,{name:'코이즈', symbol: '121850'}

,{name:'큐브앤컴퍼니', symbol: '043090'}

,{name:'키이스트', symbol: '054780'}

,{name:'탑엔지니어링', symbol: '065130'}

,{name:'태웅로직스', symbol: '124560'}

,{name:'텔콘RF제약', symbol: '200230'}

,{name:'토비스', symbol: '051360'}

,{name:'티라유텍', symbol: '322180'}

,{name:'티엘비', symbol: '356860'}

,{name:'파라다이스', symbol: '034230'}

,{name:'파버나인', symbol: '177830'}

,{name:'파워넷', symbol: '037030'}

,{name:'팍스넷', symbol: '038160'}

,{name:'프로텍', symbol: '053610'}

,{name:'프리엠스', symbol: '053160'}

,{name:'피에스케이', symbol: '319660'}

,{name:'픽셀플러스', symbol: '087600'}

,{name:'필옵틱스', symbol: '161580'}

,{name:'하나금융14호스팩', symbol: '332710'}

,{name:'하나금융16호스팩', symbol: '343510'}

,{name:'한국캐피탈', symbol: '023760'}

,{name:'한류타임즈', symbol: '039670'}

,{name:'한일네트웍스', symbol: '046110'}

,{name:'해마로푸드서비스', symbol: '220630'}

,{name:'헬릭스미스', symbol: '084990'}

,{name:'희림', symbol: '037440'}

,{name:'단디바이오', symbol: '343090'}

,{name:'도부마스크', symbol: '227420'}

,{name:'럭스피아', symbol: '092590'}

,{name:'무진메디', symbol: '322970'}

,{name:'바이오프로테크', symbol: '199290'}

,{name:'씨앤에스링크', symbol: '245450'}

,{name:'에스제이켐', symbol: '217910'}

,{name:'에이비온', symbol: '203400'}

,{name:'이십일스토어', symbol: '270020'}

,{name:'이엠티', symbol: '232530'}

,{name:'인카금융서비스', symbol: '211050'}

,{name:'태양기계', symbol: '116100'}

,{name:'피엔아이컴퍼니', symbol: '242350'}

,{name:'한중엔시에스', symbol: '107640'}

,{name:'CJ대한통운', symbol: '000120'}

,{name:'DSR제강', symbol: '069730'}

,{name:'ESR켄달스퀘어리츠', symbol: '365550'}

,{name:'GKL', symbol: '114090'}

,{name:'JW중외제약', symbol: '001060'}

,{name:'KPX홀딩스', symbol: '092230'}

,{name:'KSS해운', symbol: '044450'}

,{name:'LF', symbol: '093050'}

,{name:'LG하우시스', symbol: '108670'}

,{name:'LG화학', symbol: '051910'}

,{name:'LIG넥스원', symbol: '079550'}

,{name:'LS', symbol: '006260'}

,{name:'NAVER', symbol: '035420'}

,{name:'NICE', symbol: '034310'}

,{name:'NI스틸', symbol: '008260'}

,{name:'SGC에너지', symbol: '005090'}

,{name:'SH에너지화학', symbol: '002360'}

,{name:'SK증권', symbol: '001510'}

,{name:'SK하이닉스', symbol: '000660'}

,{name:'경인양행', symbol: '012610'}

,{name:'경인전자', symbol: '009140'}

,{name:'국보', symbol: '001140'}

,{name:'기신정기', symbol: '092440'}

,{name:'녹십자', symbol: '006280'}

,{name:'대덕', symbol: '008060'}

,{name:'대동전자', symbol: '008110'}

,{name:'대림비앤코', symbol: '005750'}

,{name:'대양금속', symbol: '009190'}

,{name:'대창', symbol: '012800'}

,{name:'동국제강', symbol: '001230'}

,{name:'동양물산기업', symbol: '002900'}

,{name:'동화약품', symbol: '000020'}

,{name:'두산중공업', symbol: '034020'}

,{name:'디아이동일', symbol: '001530'}

,{name:'디아이씨', symbol: '092200'}

,{name:'롯데관광개발', symbol: '032350'}

,{name:'맵스리얼티1', symbol: '094800'}

,{name:'명신산업', symbol: '009900'}

,{name:'무학', symbol: '033920'}

,{name:'미래아이앤지', symbol: '007120'}

,{name:'바다로19호', symbol: '155900'}

,{name:'부산주공', symbol: '005030'}

,{name:'비케이탑스', symbol: '030790'}

,{name:'사조씨푸드', symbol: '014710'}

,{name:'삼성물산', symbol: '028260'}

,{name:'삼성전자', symbol: '005930'}

,{name:'삼원강재', symbol: '023000'}

,{name:'삼익THK', symbol: '004380'}

,{name:'삼일제약', symbol: '000520'}

,{name:'삼진제약', symbol: '005500'}

,{name:'삼화왕관', symbol: '004450'}

,{name:'서연', symbol: '007860'}

,{name:'선창산업', symbol: '002820'}

,{name:'성신양회', symbol: '004980'}

,{name:'세기상사', symbol: '002420'}

,{name:'세아특수강', symbol: '019440'}

,{name:'세우글로벌', symbol: '013000'}

,{name:'세원정공', symbol: '021820'}

,{name:'세진중공업', symbol: '075580'}

,{name:'세화아이엠씨', symbol: '145210'}

,{name:'셀트리온', symbol: '068270'}

,{name:'신라교역', symbol: '004970'}

,{name:'신성통상', symbol: '005390'}

,{name:'신세계', symbol: '004170'}

,{name:'아모레퍼시픽', symbol: '090430'}

,{name:'아세아', symbol: '002030'}

,{name:'아이에스동서', symbol: '010780'}

,{name:'에스제이엠', symbol: '123700'}

,{name:'에이리츠', symbol: '140910'}

,{name:'엔에스쇼핑', symbol: '138250'}

,{name:'엔케이', symbol: '085310'}

,{name:'엔피씨', symbol: '004250'}

,{name:'영원무역', symbol: '111770'}

,{name:'영원무역홀딩스', symbol: '009970'}

,{name:'우리들휴브레인', symbol: '118000'}

,{name:'우신시스템', symbol: '017370'}

,{name:'우진', symbol: '105840'}

,{name:'우진플라임', symbol: '049800'}

,{name:'유니드', symbol: '014830'}

,{name:'유진증권', symbol: '001200'}

,{name:'이건산업', symbol: '008250'}

,{name:'이노션', symbol: '214320'}

,{name:'이연제약', symbol: '102460'}

,{name:'인스코비', symbol: '006490'}

,{name:'잇츠한불', symbol: '226320'}

,{name:'조광페인트', symbol: '004910'}

,{name:'조선내화', symbol: '000480'}

,{name:'진에어', symbol: '272450'}

,{name:'참엔지니어링', symbol: '009310'}

,{name:'케이씨씨글라스', symbol: '344820'}

,{name:'코오롱글로벌', symbol: '003070'}

,{name:'태경케미컬', symbol: '006890'}

,{name:'토니모리', symbol: '214420'}

,{name:'페이퍼코리아', symbol: '001020'}

,{name:'포스코', symbol: '005490'}

,{name:'폴루스바이오팜', symbol: '007630'}

,{name:'하나제약', symbol: '293480'}

,{name:'한국쉘석유', symbol: '002960'}

,{name:'한국철강', symbol: '104700'}

,{name:'한국화장품제조', symbol: '003350'}

,{name:'한미글로벌', symbol: '053690'}

,{name:'한솔피엔에스', symbol: '010420'}

,{name:'한양증권', symbol: '001750'}

,{name:'한진중공업', symbol: '097230'}

,{name:'한진중공업홀딩스', symbol: '003480'}

,{name:'현대일렉트릭', symbol: '267260'}

,{name:'현대제철', symbol: '004020'}

,{name:'황금에스티', symbol: '032560'}

,{name:'DSC인베스트먼트', symbol: '241520'}

,{name:'KMH', symbol: '122450'}

,{name:'NHN벅스', symbol: '104200'}

,{name:'SDN', symbol: '099220'}

,{name:'SG&G', symbol: '040610'}

,{name:'SK4호스팩', symbol: '307070'}

,{name:'SK머티리얼즈', symbol: '036490'}

,{name:'SNK', symbol: '950180'}

,{name:'WI', symbol: '073570'}

,{name:'가비아', symbol: '079940'}

,{name:'경남스틸', symbol: '039240'}

,{name:'국일신동', symbol: '060480'}

,{name:'글로벌텍스프리', symbol: '204620'}

,{name:'글로본', symbol: '019660'}

,{name:'나노', symbol: '187790'}

,{name:'네오셈', symbol: '253590'}

,{name:'네오위즈홀딩스', symbol: '042420'}

,{name:'네이블커뮤니케이션즈', symbol: '153460'}

,{name:'넥스트BT', symbol: '065170'}

,{name:'노바렉스', symbol: '194700'}

,{name:'대성엘텍', symbol: '025440'}

,{name:'대신밸런스제7호스팩', symbol: '332290'}

,{name:'대양전기공업', symbol: '108380'}

,{name:'대원', symbol: '007680'}

,{name:'대한뉴팜', symbol: '054670'}

,{name:'더블유에프엠', symbol: '035290'}

,{name:'덕산테코피아', symbol: '317330'}

,{name:'덕산하이메탈', symbol: '077360'}

,{name:'동국제약', symbol: '086450'}

,{name:'동진쎄미켐', symbol: '005290'}

,{name:'디바이스이엔지', symbol: '187870'}

,{name:'디알젬', symbol: '263690'}

,{name:'디에스티', symbol: '033430'}

,{name:'라이온켐텍', symbol: '171120'}

,{name:'레이크머티리얼즈', symbol: '281740'}

,{name:'로지시스', symbol: '067730'}

,{name:'릭스솔루션', symbol: '029480'}

,{name:'링네트', symbol: '042500'}

,{name:'마이크로프랜드', symbol: '147760'}

,{name:'메가스터디교육', symbol: '215200'}

,{name:'메드팩토', symbol: '235980'}

,{name:'모헨즈', symbol: '006920'}

,{name:'미코', symbol: '059090'}

,{name:'민앤지', symbol: '214180'}

,{name:'바른손이앤에이', symbol: '035620'}

,{name:'바이온', symbol: '032980'}

,{name:'베노홀딩스', symbol: '206400'}

,{name:'비디아이', symbol: '148140'}

,{name:'비보존 헬스케어', symbol: '082800'}

,{name:'비에이치아이', symbol: '083650'}

,{name:'새로닉스', symbol: '042600'}

,{name:'서연탑메탈', symbol: '019770'}

,{name:'서울반도체', symbol: '046890'}

,{name:'서울전자통신', symbol: '027040'}

,{name:'서원인텍', symbol: '093920'}

,{name:'선데이토즈', symbol: '123420'}

,{name:'성호전자', symbol: '043260'}

,{name:'세틀뱅크', symbol: '234340'}

,{name:'센코', symbol: '347000'}

,{name:'슈프리마에이치큐', symbol: '094840'}

,{name:'스타플렉스', symbol: '115570'}

,{name:'시노펙스', symbol: '025320'}

,{name:'신원종합개발', symbol: '017000'}

,{name:'신흥에스이씨', symbol: '243840'}

,{name:'씨앤지하이테크', symbol: '264660'}

,{name:'씨티씨바이오', symbol: '060590'}

,{name:'아스타', symbol: '246720'}

,{name:'아시아종묘', symbol: '154030'}

,{name:'아우딘퓨쳐스', symbol: '227610'}

,{name:'아이엘사이언스', symbol: '307180'}

,{name:'아이진', symbol: '185490'}

,{name:'아이큐어', symbol: '175250'}

,{name:'아이크래프트', symbol: '052460'}

,{name:'안트로젠', symbol: '065660'}

,{name:'알에스오토메이션', symbol: '140670'}

,{name:'에스디생명공학', symbol: '217480'}

,{name:'에스씨엠생명과학', symbol: '298060'}

,{name:'에스앤씨엔진그룹', symbol: '900080'}

,{name:'에스텍파마', symbol: '041910'}

,{name:'에이비프로바이오', symbol: '195990'}

,{name:'에이스테크', symbol: '088800'}

,{name:'에이치엔티', symbol: '176440'}

,{name:'에이치엘사이언스', symbol: '239610'}

,{name:'에이치엠씨제4호스팩', symbol: '353070'}

,{name:'에이티세미콘', symbol: '089530'}

,{name:'에이팩트', symbol: '200470'}

,{name:'에이프로젠 H&G', symbol: '109960'}

,{name:'에코플라스틱', symbol: '038110'}

,{name:'엑사이엔씨', symbol: '054940'}

,{name:'엔에스', symbol: '217820'}

,{name:'엔에스엔', symbol: '031860'}

,{name:'엔지스테크널러지', symbol: '208860'}

,{name:'엔피디', symbol: '198080'}

,{name:'엘아이에스', symbol: '138690'}

,{name:'엘앤씨바이오', symbol: '290650'}

,{name:'엘오티베큠', symbol: '083310'}

,{name:'엠브레인', symbol: '169330'}

,{name:'엠투아이', symbol: '347890'}

,{name:'엠플러스', symbol: '259630'}

,{name:'예스24', symbol: '053280'}

,{name:'오가닉티코스메틱', symbol: '900300'}

,{name:'오하임아이엔티', symbol: '309930'}

,{name:'옵트론텍', symbol: '082210'}

,{name:'옵티팜', symbol: '153710'}

,{name:'와이솔', symbol: '122990'}

,{name:'와이아이케이', symbol: '232140'}

,{name:'우노앤컴퍼니', symbol: '114630'}

,{name:'우리산업홀딩스', symbol: '072470'}

,{name:'우양', symbol: '103840'}

,{name:'우진비앤지', symbol: '018620'}

,{name:'원익', symbol: '032940'}

,{name:'유성티엔에스', symbol: '024800'}

,{name:'유에스티', symbol: '263770'}

,{name:'이루온', symbol: '065440'}

,{name:'이엘피', symbol: '063760'}

,{name:'이지홀딩스', symbol: '035810'}

,{name:'이트론', symbol: '096040'}

,{name:'인터엠', symbol: '017250'}

,{name:'인터플렉스', symbol: '051370'}

,{name:'전파기지국', symbol: '065530'}

,{name:'제너셈', symbol: '217190'}

,{name:'제넥신', symbol: '095700'}

,{name:'제넨바이오', symbol: '072520'}

,{name:'제노레이', symbol: '122310'}

,{name:'제로투세븐', symbol: '159580'}

,{name:'제룡전기', symbol: '033100'}

,{name:'제이씨현시스템', symbol: '033320'}

,{name:'조광ILI', symbol: '044060'}

,{name:'칩스앤미디어', symbol: '094360'}

,{name:'컴퍼니케이', symbol: '307930'}

,{name:'케이사인', symbol: '192250'}

,{name:'케이씨에스', symbol: '115500'}

,{name:'케이아이엔엑스', symbol: '093320'}

,{name:'켐온', symbol: '217600'}

,{name:'코맥스', symbol: '036690'}

,{name:'코세스', symbol: '089890'}

,{name:'코스메카코리아', symbol: '241710'}

,{name:'코엔텍', symbol: '029960'}

,{name:'코텍', symbol: '052330'}

,{name:'콜마비앤에이치', symbol: '200130'}

,{name:'큐캐피탈', symbol: '016600'}

,{name:'타이거일렉', symbol: '219130'}

,{name:'태광', symbol: '023160'}

,{name:'토탈소프트', symbol: '045340'}

,{name:'티로보틱스', symbol: '117730'}

,{name:'티앤엘', symbol: '340570'}

,{name:'파마리서치프로덕트', symbol: '214450'}

,{name:'파인디앤씨', symbol: '049120'}

,{name:'파인텍', symbol: '131760'}

,{name:'펩트론', symbol: '087010'}

,{name:'포스링크', symbol: '056730'}

,{name:'풍국주정', symbol: '023900'}

,{name:'퓨쳐스트림네트웍스', symbol: '214270'}

,{name:'퓨쳐켐', symbol: '220100'}

,{name:'피씨디렉트', symbol: '051380'}

,{name:'피에스케이홀딩스', symbol: '031980'}

,{name:'피플바이오', symbol: '304840'}

,{name:'하나기술', symbol: '299030'}

,{name:'하이로닉', symbol: '149980'}

,{name:'하이소닉', symbol: '106080'}

,{name:'한국유니온제약', symbol: '080720'}

,{name:'한국컴퓨터', symbol: '054040'}

,{name:'한국테크놀로지', symbol: '053590'}

,{name:'한송네오텍', symbol: '226440'}

,{name:'한일사료', symbol: '005860'}

,{name:'헝셩그룹', symbol: '900270'}

,{name:'화일약품', symbol: '061250'}

,{name:'효성오앤비', symbol: '097870'}

,{name:'휴온스', symbol: '243070'}

,{name:'휴젤', symbol: '145020'}

,{name:'루트락', symbol: '253610'}

,{name:'메디쎄이', symbol: '200580'}

,{name:'바이오코아', symbol: '216400'}

,{name:'빅텐츠', symbol: '210120'}

,{name:'씨알푸드', symbol: '236030'}

,{name:'아퓨어스', symbol: '149300'}

,{name:'안지오랩', symbol: '251280'}

,{name:'엔에스컴퍼니', symbol: '224760'}

,{name:'엘에이티', symbol: '311060'}

,{name:'위월드', symbol: '140660'}

,{name:'유비온', symbol: '084440'}

,{name:'지오씨', symbol: '135160'}

,{name:'AJ네트웍스', symbol: '095570'}

,{name:'AK홀딩스', symbol: '006840'}

,{name:'CJ', symbol: '001040'}

,{name:'CJ씨푸드', symbol: '011150'}

,{name:'DB금융투자', symbol: '016610'}

,{name:'DGB금융지주', symbol: '139130'}

,{name:'E1', symbol: '017940'}

,{name:'F&F', symbol: '007700'}

,{name:'KEC', symbol: '092220'}

,{name:'KISCO홀딩스', symbol: '001940'}

,{name:'LG', symbol: '003550'}

,{name:'LG디스플레이', symbol: '034220'}

,{name:'LS전선아시아', symbol: '229640'}

,{name:'NH프라임리츠', symbol: '338100'}

,{name:'S&T중공업', symbol: '003570'}

,{name:'S&T홀딩스', symbol: '036530'}

,{name:'S-Oil', symbol: '010950'}

,{name:'SK네트웍스', symbol: '001740'}

,{name:'SK케미칼', symbol: '285130'}

,{name:'경동인베스트', symbol: '012320'}

,{name:'계룡건설산업', symbol: '013580'}

,{name:'국동', symbol: '005320'}

,{name:'남양유업', symbol: '003920'}

,{name:'남해화학', symbol: '025860'}

,{name:'노루페인트', symbol: '090350'}

,{name:'대상', symbol: '001680'}

,{name:'대성홀딩스', symbol: '016710'}

,{name:'대한제강', symbol: '084010'}

,{name:'대호에이엘', symbol: '069460'}

,{name:'덴티움', symbol: '145720'}

,{name:'동원F&B', symbol: '049770'}

,{name:'두산퓨얼셀', symbol: '336260'}

,{name:'만호제강', symbol: '001080'}

,{name:'모나미', symbol: '005360'}

,{name:'문배철강', symbol: '008420'}

,{name:'미래에셋생명', symbol: '085620'}

,{name:'미창석유공업', symbol: '003650'}

,{name:'백광산업', symbol: '001340'}

,{name:'벽산', symbol: '007210'}

,{name:'부국철강', symbol: '026940'}

,{name:'부산도시가스', symbol: '015350'}

,{name:'비비안', symbol: '002070'}

,{name:'비상교육', symbol: '100220'}

,{name:'사조산업', symbol: '007160'}

,{name:'삼부토건', symbol: '001470'}

,{name:'삼성공조', symbol: '006660'}

,{name:'삼성생명', symbol: '032830'}

,{name:'삼성전기', symbol: '009150'}

,{name:'삼성제약', symbol: '001360'}

,{name:'삼양사', symbol: '145990'}

,{name:'삼양패키징', symbol: '272550'}

,{name:'삼일씨엔에스', symbol: '004440'}

,{name:'삼화전기', symbol: '009470'}

,{name:'샘표', symbol: '007540'}

,{name:'서흥', symbol: '008490'}

,{name:'세아베스틸', symbol: '001430'}

,{name:'세하', symbol: '027970'}

,{name:'수산중공업', symbol: '017550'}

,{name:'신세계건설', symbol: '034300'}

,{name:'신영와코루', symbol: '005800'}

,{name:'신영증권', symbol: '001720'}

,{name:'신원', symbol: '009270'}

,{name:'신풍제지', symbol: '002870'}

,{name:'아주캐피탈', symbol: '033660'}

,{name:'에스엘', symbol: '005850'}

,{name:'에이프로젠 KIC', symbol: '007460'}

,{name:'엘브이엠씨', symbol: '900140'}

,{name:'엘에스일렉트릭', symbol: '010120'}

,{name:'오리온', symbol: '271560'}

,{name:'우리금융지주', symbol: '316140'}

,{name:'우성사료', symbol: '006980'}

,{name:'웰바이오텍', symbol: '010600'}

,{name:'유니온', symbol: '000910'}

,{name:'유안타증권', symbol: '003470'}

,{name:'일진전기', symbol: '103590'}

,{name:'조광피혁', symbol: '004700'}

,{name:'조일알미늄', symbol: '018470'}

,{name:'진흥기업', symbol: '002780'}

,{name:'카카오', symbol: '035720'}

,{name:'케이씨티시', symbol: '009070'}

,{name:'케이티', symbol: '030200'}

,{name:'코리안리', symbol: '003690'}

,{name:'코스맥스비티아이', symbol: '044820'}

,{name:'코오롱머티리얼', symbol: '144620'}

,{name:'크라운제과', symbol: '264900'}

,{name:'크라운해태홀딩스', symbol: '005740'}

,{name:'키움증권', symbol: '039490'}

,{name:'태림포장', symbol: '011280'}

,{name:'태원물산', symbol: '001420'}

,{name:'티에이치엔', symbol: '019180'}

,{name:'팬오션', symbol: '028670'}

,{name:'평화산업', symbol: '090080'}

,{name:'하나투어', symbol: '039130'}

,{name:'하이골드12호', symbol: '172580'}

,{name:'한국프랜지공업', symbol: '010100'}

,{name:'한독', symbol: '002390'}

,{name:'한세엠케이', symbol: '069640'}

,{name:'한솔제지', symbol: '213500'}

,{name:'한솔케미칼', symbol: '014680'}

,{name:'한솔테크닉스', symbol: '004710'}

,{name:'한온시스템', symbol: '018880'}

,{name:'한진', symbol: '002320'}

,{name:'해성디에스', symbol: '195870'}

,{name:'현대리바트', symbol: '079430'}

,{name:'현대백화점', symbol: '069960'}

,{name:'형지엘리트', symbol: '093240'}

,{name:'혜인', symbol: '003010'}

,{name:'화성산업', symbol: '002460'}

,{name:'휴비스', symbol: '079980'}

,{name:'CNH', symbol: '023460'}

,{name:'DMS', symbol: '068790'}

,{name:'GH신소재', symbol: '130500'}

,{name:'IBKS제14호스팩', symbol: '351320'}

,{name:'KBI메탈', symbol: '024840'}

,{name:'KMH하이텍', symbol: '052900'}

,{name:'KNN', symbol: '058400'}

,{name:'KPX생명과학', symbol: '114450'}

,{name:'KTH', symbol: '036030'}

,{name:'KT서브마린', symbol: '060370'}

,{name:'SBS콘텐츠허브', symbol: '046140'}

,{name:'SGA', symbol: '049470'}

,{name:'SV인베스트먼트', symbol: '289080'}

,{name:'TPC', symbol: '048770'}

,{name:'TS인베스트먼트', symbol: '246690'}

,{name:'YBM넷', symbol: '057030'}

,{name:'iMBC', symbol: '052220'}

,{name:'가온미디어', symbol: '078890'}

,{name:'경동제약', symbol: '011040'}

,{name:'골든센츄리', symbol: '900280'}

,{name:'광진윈텍', symbol: '090150'}

,{name:'국보디자인', symbol: '066620'}

,{name:'글로스퍼랩스', symbol: '032860'}

,{name:'나스미디어', symbol: '089600'}

,{name:'나이스정보통신', symbol: '036800'}

,{name:'남화산업', symbol: '111710'}

,{name:'네오오토', symbol: '212560'}

,{name:'네오위즈', symbol: '095660'}

,{name:'네오크레마', symbol: '311390'}

,{name:'노랑풍선', symbol: '104620'}

,{name:'노바텍', symbol: '285490'}

,{name:'뉴보텍', symbol: '060260'}

,{name:'다날', symbol: '064260'}

,{name:'대원미디어', symbol: '048910'}

,{name:'대한과학', symbol: '131220'}

,{name:'대호피앤씨', symbol: '021040'}

,{name:'대화제약', symbol: '067080'}

,{name:'동아화성', symbol: '041930'}

,{name:'동양파일', symbol: '228340'}

,{name:'디앤씨미디어', symbol: '263720'}

,{name:'디오스텍', symbol: '196450'}

,{name:'디이엔티', symbol: '079810'}

,{name:'라닉스', symbol: '317120'}

,{name:'라온피플', symbol: '300120'}

,{name:'라이트론', symbol: '069540'}

,{name:'랩지노믹스', symbol: '084650'}

,{name:'로스웰', symbol: '900260'}

,{name:'리더스코스메틱', symbol: '016100'}

,{name:'리메드', symbol: '302550'}

,{name:'린드먼아시아', symbol: '277070'}

,{name:'마니커에프앤지', symbol: '195500'}

,{name:'메가엠디', symbol: '133750'}

,{name:'메카로', symbol: '241770'}

,{name:'모베이스', symbol: '101330'}

,{name:'모아텍', symbol: '033200'}

,{name:'미래에셋대우스팩4호', symbol: '333430'}

,{name:'바이오스마트', symbol: '038460'}

,{name:'박셀바이오', symbol: '323990'}

,{name:'보광산업', symbol: '225530'}

,{name:'본느', symbol: '226340'}

,{name:'브릿지바이오', symbol: '288330'}

,{name:'블러썸엠앤씨', symbol: '263920'}

,{name:'비엠티', symbol: '086670'}

,{name:'비츠로셀', symbol: '082920'}

,{name:'삼보모터스', symbol: '053700'}

,{name:'삼영엠텍', symbol: '054540'}

,{name:'삼천당제약', symbol: '000250'}

,{name:'샘코', symbol: '263540'}

,{name:'서울바이오시스', symbol: '092190'}

,{name:'서울옥션', symbol: '063170'}

,{name:'서한', symbol: '011370'}

,{name:'성도이엔지', symbol: '037350'}

,{name:'성우전자', symbol: '081580'}

,{name:'세동', symbol: '053060'}

,{name:'세미콘라이트', symbol: '214310'}

,{name:'세원', symbol: '234100'}

,{name:'세원물산', symbol: '024830'}

,{name:'셀리버리', symbol: '268600'}

,{name:'소룩스', symbol: '290690'}

,{name:'소프트캠프', symbol: '258790'}

,{name:'솔브레인', symbol: '357780'}

,{name:'스카이문스테크놀로지', symbol: '033790'}

,{name:'시너지이노베이션', symbol: '048870'}

,{name:'신화인터텍', symbol: '056700'}

,{name:'아이컴포넌트', symbol: '059100'}

,{name:'아즈텍WB', symbol: '032080'}

,{name:'안랩', symbol: '053800'}

,{name:'알서포트', symbol: '131370'}

,{name:'액트', symbol: '131400'}

,{name:'에너토크', symbol: '019990'}

,{name:'에버다임', symbol: '041440'}

,{name:'에스넷', symbol: '038680'}

,{name:'에스디시스템', symbol: '121890'}

,{name:'에스에이엠티', symbol: '031330'}

,{name:'에스티큐브', symbol: '052020'}

,{name:'에스피지', symbol: '058610'}

,{name:'에이프로', symbol: '262260'}

,{name:'에이피티씨', symbol: '089970'}

,{name:'에코마케팅', symbol: '230360'}

,{name:'에코바이오', symbol: '038870'}

,{name:'에코캡', symbol: '128540'}

,{name:'에프앤가이드', symbol: '064850'}

,{name:'에프앤리퍼블릭', symbol: '064090'}

,{name:'에프엔에스테크', symbol: '083500'}

,{name:'엔바이오니아', symbol: '317870'}

,{name:'엔에이치스팩13호', symbol: '310840'}

,{name:'엘엠에스', symbol: '073110'}

,{name:'엠아이텍', symbol: '179290'}

,{name:'엠에스오토텍', symbol: '123040'}

,{name:'엠케이전자', symbol: '033160'}

,{name:'오이솔루션', symbol: '138080'}

,{name:'올리패스', symbol: '244460'}

,{name:'와이엠씨', symbol: '155650'}

,{name:'와이엠티', symbol: '251370'}

,{name:'와이제이엠게임즈', symbol: '193250'}

,{name:'와이팜', symbol: '332570'}

,{name:'우리넷', symbol: '115440'}

,{name:'우리조명', symbol: '037400'}

,{name:'원익IPS', symbol: '240810'}

,{name:'위세아이텍', symbol: '065370'}

,{name:'유니슨', symbol: '018000'}

,{name:'유니크', symbol: '011320'}

,{name:'유아이디', symbol: '069330'}

,{name:'유아이엘', symbol: '049520'}

,{name:'이상네트웍스', symbol: '080010'}

,{name:'이엠네트웍스', symbol: '087730'}

,{name:'이엠코리아', symbol: '095190'}

,{name:'이오플로우', symbol: '294090'}

,{name:'이큐셀', symbol: '160600'}

,{name:'이퓨쳐', symbol: '134060'}

,{name:'이화공영', symbol: '001840'}

,{name:'인텔리안테크', symbol: '189300'}

,{name:'인피니트헬스케어', symbol: '071200'}

,{name:'일신바이오', symbol: '068330'}

,{name:'잉글우드랩', symbol: '950140'}

,{name:'정원엔시스', symbol: '045510'}

,{name:'제이씨케미칼', symbol: '137950'}

,{name:'제이웨이', symbol: '058420'}

,{name:'젬백스링크', symbol: '064800'}

,{name:'좋은사람들', symbol: '033340'}

,{name:'중앙백신', symbol: '072020'}

,{name:'지놈앤컴퍼니', symbol: '314130'}

,{name:'지트리비앤티', symbol: '115450'}

,{name:'청보산업', symbol: '013720'}

,{name:'카스', symbol: '016920'}

,{name:'카카오게임즈', symbol: '293490'}

,{name:'카페24', symbol: '042000'}

,{name:'케이비17호스팩', symbol: '317030'}

,{name:'케이에스피', symbol: '073010'}

,{name:'큐리언트', symbol: '115180'}

,{name:'크리스탈신소재', symbol: '900250'}

,{name:'크린앤사이언스', symbol: '045520'}

,{name:'클래시스', symbol: '214150'}

,{name:'태웅', symbol: '044490'}

,{name:'테라셈', symbol: '182690'}

,{name:'토박스코리아', symbol: '215480'}

,{name:'티사이언티픽', symbol: '057680'}

,{name:'티씨케이', symbol: '064760'}

,{name:'티케이케미칼', symbol: '104480'}

,{name:'팅크웨어', symbol: '084730'}

,{name:'판타지오', symbol: '032800'}

,{name:'팜스토리', symbol: '027710'}

,{name:'포인트모바일', symbol: '318020'}

,{name:'푸드나무', symbol: '290720'}

,{name:'푸른저축은행', symbol: '007330'}

,{name:'플랜티넷', symbol: '075130'}

,{name:'피제이메탈', symbol: '128660'}

,{name:'하나머티리얼즈', symbol: '166090'}

,{name:'한국선재', symbol: '025550'}

,{name:'한국전자인증', symbol: '041460'}

,{name:'한국큐빅', symbol: '021650'}

,{name:'한국파마', symbol: '032300'}

,{name:'한독크린텍', symbol: '256150'}

,{name:'한화플러스제1호스팩', symbol: '340440'}

,{name:'현대사료', symbol: '016790'}

,{name:'현우산업', symbol: '092300'}

,{name:'홈캐스트', symbol: '064240'}

,{name:'휴메딕스', symbol: '200670'}

,{name:'휴온스글로벌', symbol: '084110'}

,{name:'흥구석유', symbol: '024060'}

,{name:'골프존데카', symbol: '183410'}

,{name:'네추럴FNP', symbol: '086220'}

,{name:'데이터스트림즈', symbol: '199150'}

,{name:'루켄테크놀러지스', symbol: '162120'}

,{name:'비엔디생활건강', symbol: '215050'}

,{name:'셀젠텍', symbol: '258250'}

,{name:'아이케이세미콘', symbol: '149010'}

,{name:'애드바이오텍', symbol: '179530'}

,{name:'에스엘에스바이오', symbol: '246250'}

,{name:'엔지브이아이', symbol: '093510'}

,{name:'유엑스엔', symbol: '337840'}

,{name:'이비테크', symbol: '208850'}

,{name:'이앤에치', symbol: '341310'}

,{name:'이에스산업', symbol: '241510'}

,{name:'청광건설', symbol: '140290'}

,{name:'파인이엠텍', symbol: '278990'}

,{name:'펨토바이오메드', symbol: '327610'}

,{name:'프로테옴텍', symbol: '303360'}

,{name:'BGF', symbol: '027410'}

,{name:'CS홀딩스', symbol: '000590'}

,{name:'DB', symbol: '012030'}

,{name:'GS리테일', symbol: '007070'}

,{name:'HDC', symbol: '012630'}

,{name:'JW생명과학', symbol: '234080'}

,{name:'KC그린홀딩스', symbol: '009440'}

,{name:'KR모터스', symbol: '000040'}

,{name:'LG유플러스', symbol: '032640'}

,{name:'SPC삼립', symbol: '005610'}

,{name:'경농', symbol: '002100'}

,{name:'경동도시가스', symbol: '267290'}

,{name:'경방', symbol: '000050'}

,{name:'고려제강', symbol: '002240'}

,{name:'광동제약', symbol: '009290'}

,{name:'광주신세계', symbol: '037710'}

,{name:'국도화학', symbol: '007690'}

,{name:'금비', symbol: '008870'}

,{name:'금호타이어', symbol: '073240'}

,{name:'대림통상', symbol: '006570'}

,{name:'대신증권', symbol: '003540'}

,{name:'대원강업', symbol: '000430'}

,{name:'대원화성', symbol: '024890'}

,{name:'대유에이텍', symbol: '002880'}

,{name:'더블유게임즈', symbol: '192080'}

,{name:'동부건설', symbol: '005960'}

,{name:'동성제약', symbol: '002210'}

,{name:'동아에스티', symbol: '170900'}

,{name:'동양고속', symbol: '084670'}

,{name:'동양철관', symbol: '008970'}

,{name:'동원수산', symbol: '030720'}

,{name:'롯데쇼핑', symbol: '023530'}

,{name:'메리츠화재', symbol: '000060'}

,{name:'미원에스씨', symbol: '268280'}

,{name:'부광약품', symbol: '003000'}

,{name:'부산산업', symbol: '011390'}

,{name:'삼익악기', symbol: '002450'}

,{name:'삼천리', symbol: '004690'}

,{name:'서울식품공업', symbol: '004410'}

,{name:'성창기업지주', symbol: '000180'}

,{name:'세종공업', symbol: '033530'}

,{name:'센트럴인사이트', symbol: '012600'}

,{name:'시디즈', symbol: '134790'}

,{name:'아시아나항공', symbol: '020560'}

,{name:'알루코', symbol: '001780'}

,{name:'에스제이엠홀딩스', symbol: '025530'}

,{name:'오뚜기', symbol: '007310'}

,{name:'유성기업', symbol: '002920'}

,{name:'유양디앤유', symbol: '011690'}

,{name:'율촌화학', symbol: '008730'}

,{name:'이리츠코크렙', symbol: '088260'}

,{name:'이수페타시스', symbol: '007660'}

,{name:'이아이디', symbol: '093230'}

,{name:'인디에프', symbol: '014990'}

,{name:'인지컨트롤스', symbol: '023800'}

,{name:'일동홀딩스', symbol: '000230'}

,{name:'일진홀딩스', symbol: '015860'}

,{name:'자이에스앤디', symbol: '317400'}

,{name:'자화전자', symbol: '033240'}

,{name:'전방', symbol: '000950'}

,{name:'제이알글로벌리츠', symbol: '348950'}

,{name:'제이콘텐트리', symbol: '036420'}

,{name:'제일기획', symbol: '030000'}

,{name:'지투알', symbol: '035000'}

,{name:'진양폴리우레탄', symbol: '010640'}

,{name:'케이씨씨', symbol: '002380'}

,{name:'코스맥스', symbol: '192820'}

,{name:'콤텍시스템', symbol: '031820'}

,{name:'태경비케이', symbol: '014580'}

,{name:'티웨이항공', symbol: '091810'}

,{name:'퍼스텍', symbol: '010820'}

,{name:'포스코인터내셔널', symbol: '047050'}

,{name:'하이골드3호', symbol: '153360'}

,{name:'한국ANKOR유전', symbol: '152550'}

,{name:'한국내화', symbol: '010040'}

,{name:'한국주철관공업', symbol: '000970'}

,{name:'한국화장품', symbol: '123690'}

,{name:'한라', symbol: '014790'}

,{name:'한미반도체', symbol: '042700'}

,{name:'한섬', symbol: '020000'}

,{name:'한세실업', symbol: '105630'}

,{name:'한솔홈데코', symbol: '025750'}

,{name:'한올바이오파마', symbol: '009420'}

,{name:'한전산업', symbol: '130660'}

,{name:'한화손해보험', symbol: '000370'}

,{name:'핸즈코퍼레이션', symbol: '143210'}

,{name:'현대오토에버', symbol: '307950'}

,{name:'화승엔터프라이즈', symbol: '241590'}

,{name:'화인베스틸', symbol: '133820'}

,{name:'화천기계', symbol: '010660'}

,{name:'효성첨단소재', symbol: '298050'}

,{name:'후성', symbol: '093370'}

,{name:'휠라홀딩스', symbol: '081660'}

,{name:'휴스틸', symbol: '005010'}

,{name:'3S', symbol: '060310'}

,{name:'CJ프레시웨이', symbol: '051500'}

,{name:'JYP Ent.', symbol: '035900'}

,{name:'RFHIC', symbol: '218410'}

,{name:'강원', symbol: '114190'}

,{name:'경남제약', symbol: '053950'}

,{name:'고려신용정보', symbol: '049720'}

,{name:'고바이오랩', symbol: '348150'}

,{name:'골드퍼시픽', symbol: '038530'}

,{name:'광진실업', symbol: '026910'}

,{name:'그린플러스', symbol: '186230'}

,{name:'기산텔레콤', symbol: '035460'}

,{name:'나무기술', symbol: '242040'}

,{name:'나이스디앤비', symbol: '130580'}

,{name:'네패스', symbol: '033640'}

,{name:'대동금속', symbol: '020400'}

,{name:'대림제지', symbol: '017650'}

,{name:'대신정보통신', symbol: '020180'}

,{name:'대한그린파워', symbol: '060900'}

,{name:'동국알앤에스', symbol: '075970'}

,{name:'동우팜투테이블', symbol: '088910'}

,{name:'동운아나텍', symbol: '094170'}

,{name:'드림씨아이에스', symbol: '223250'}

,{name:'디아이티', symbol: '110990'}

,{name:'디에이치피코리아', symbol: '131030'}

,{name:'디케이락', symbol: '105740'}

,{name:'디케이앤디', symbol: '263020'}

,{name:'디케이티', symbol: '290550'}

,{name:'라온시큐어', symbol: '042510'}

,{name:'라파스', symbol: '214260'}

,{name:'리노스', symbol: '039980'}

,{name:'리더스 기술투자', symbol: '019570'}

,{name:'마이크로컨텍솔', symbol: '098120'}

,{name:'메지온', symbol: '140410'}

,{name:'모다이노칩', symbol: '080420'}

,{name:'모베이스전자', symbol: '012860'}

,{name:'미디어젠', symbol: '279600'}

,{name:'미래나노텍', symbol: '095500'}

,{name:'미래에셋대우스팩 5호', symbol: '353490'}

,{name:'미래테크놀로지', symbol: '213090'}

,{name:'미투젠', symbol: '950190'}

,{name:'바이오리더스', symbol: '142760'}

,{name:'바텍', symbol: '043150'}

,{name:'뷰웍스', symbol: '100120'}

,{name:'브레인콘텐츠', symbol: '066980'}

,{name:'블루콤', symbol: '033560'}

,{name:'비덴트', symbol: '121800'}

,{name:'비에이치', symbol: '090460'}

,{name:'비올', symbol: '335890'}

,{name:'비츠로테크', symbol: '042370'}

,{name:'비피도', symbol: '238200'}

,{name:'빅텍', symbol: '065450'}

,{name:'삼강엠앤티', symbol: '100090'}

,{name:'삼보산업', symbol: '009620'}

,{name:'삼표시멘트', symbol: '038500'}

,{name:'상상인이안1호스팩', symbol: '307870'}

,{name:'상아프론테크', symbol: '089980'}

,{name:'서부T&D', symbol: '006730'}

,{name:'석경에이티', symbol: '357550'}

,{name:'선광', symbol: '003100'}

,{name:'세화피앤씨', symbol: '252500'}

,{name:'셀레믹스', symbol: '331920'}

,{name:'셀리드', symbol: '299660'}

,{name:'소마젠', symbol: '950200'}

,{name:'수산아이앤티', symbol: '050960'}

,{name:'수성', symbol: '084180'}

,{name:'수젠텍', symbol: '253840'}

,{name:'스맥', symbol: '099440'}

,{name:'신라섬유', symbol: '001000'}

,{name:'신화콘텍', symbol: '187270'}

,{name:'쎄니트', symbol: '037760'}

,{name:'씨씨에스', symbol: '066790'}

,{name:'씨엔플러스', symbol: '115530'}

,{name:'씨젠', symbol: '096530'}

,{name:'아리온', symbol: '058220'}

,{name:'아시아경제', symbol: '127710'}

,{name:'아이디스홀딩스', symbol: '054800'}

,{name:'아이쓰리시스템', symbol: '214430'}

,{name:'아주IB투자', symbol: '027360'}

,{name:'안국약품', symbol: '001540'}

,{name:'알테오젠', symbol: '196170'}

,{name:'알톤스포츠', symbol: '123750'}

,{name:'알파홀딩스', symbol: '117670'}

,{name:'압타바이오', symbol: '293780'}

,{name:'야스', symbol: '255440'}

,{name:'에스맥', symbol: '097780'}

,{name:'에스에이티', symbol: '060540'}

,{name:'에스엔유', symbol: '080000'}

,{name:'에스엠코어', symbol: '007820'}

,{name:'에스티오', symbol: '098660'}

,{name:'에이에프더블류', symbol: '312610'}

,{name:'에이치엘비', symbol: '028300'}

,{name:'에코마이스터', symbol: '064510'}

,{name:'에프엔씨엔터', symbol: '173940'}

,{name:'엔시트론', symbol: '101400'}

,{name:'엔에프씨', symbol: '265740'}

,{name:'엘비세미콘', symbol: '061970'}

,{name:'엘이티', symbol: '297890'}

,{name:'엠에스씨', symbol: '009780'}

,{name:'엠젠플러스', symbol: '032790'}

,{name:'연우', symbol: '115960'}

,{name:'오디텍', symbol: '080520'}

,{name:'오로라', symbol: '039830'}

,{name:'오상자이엘', symbol: '053980'}

,{name:'와이엔텍', symbol: '067900'}

,{name:'와이오엠', symbol: '066430'}

,{name:'와이지엔터테인먼트', symbol: '122870'}

,{name:'우리기술투자', symbol: '041190'}

,{name:'우주일렉트로', symbol: '065680'}

,{name:'웹케시', symbol: '053580'}

,{name:'위니아딤채', symbol: '071460'}

,{name:'위더스제약', symbol: '330350'}

,{name:'위드텍', symbol: '348350'}

,{name:'위지윅스튜디오', symbol: '299900'}

,{name:'윈스', symbol: '136540'}

,{name:'윈텍', symbol: '320000'}

,{name:'유라테크', symbol: '048430'}

,{name:'유틸렉스', symbol: '263050'}

,{name:'율호', symbol: '072770'}

,{name:'이그잭스', symbol: '060230'}

,{name:'이니텍', symbol: '053350'}

,{name:'이더블유케이', symbol: '258610'}

,{name:'인지디스플레', symbol: '037330'}

,{name:'인콘', symbol: '083640'}

,{name:'인크로스', symbol: '216050'}

,{name:'일지테크', symbol: '019540'}

,{name:'제이에스티나', symbol: '026040'}

,{name:'제이엠아이', symbol: '033050'}

,{name:'제일전기공업', symbol: '199820'}

,{name:'지니틱스', symbol: '303030'}

,{name:'진로발효', symbol: '018120'}

,{name:'체리부로', symbol: '066360'}

,{name:'케이디켐', symbol: '221980'}

,{name:'케이씨티', symbol: '089150'}

,{name:'케이피에스', symbol: '256940'}

,{name:'코나아이', symbol: '052400'}

,{name:'코디', symbol: '080530'}

,{name:'코리아에스이', symbol: '101670'}

,{name:'코스나인', symbol: '082660'}

,{name:'코스온', symbol: '069110'}

,{name:'코아스템', symbol: '166480'}

,{name:'큐렉소', symbol: '060280'}

,{name:'큐로컴', symbol: '040350'}

,{name:'태양', symbol: '053620'}

,{name:'테크윙', symbol: '089030'}

,{name:'투비소프트', symbol: '079970'}

,{name:'티엘아이', symbol: '062860'}

,{name:'티움바이오', symbol: '321550'}

,{name:'파인테크닉스', symbol: '106240'}

,{name:'팜스빌', symbol: '318010'}

,{name:'팬스타엔터프라이즈', symbol: '054300'}

,{name:'평화정공', symbol: '043370'}

,{name:'포메탈', symbol: '119500'}

,{name:'포스코 ICT', symbol: '022100'}

,{name:'플레이위드', symbol: '023770'}

,{name:'피씨엘', symbol: '241820'}

,{name:'피피아이', symbol: '062970'}

,{name:'한국제8호스팩', symbol: '310870'}

,{name:'한솔인티큐브', symbol: '070590'}

,{name:'한창산업', symbol: '079170'}

,{name:'한컴MDS', symbol: '086960'}

,{name:'한화에스비아이스팩', symbol: '317320'}

,{name:'핸디소프트', symbol: '220180'}

,{name:'현대공업', symbol: '170030'}

,{name:'화신정공', symbol: '126640'}

,{name:'휴마시스', symbol: '205470'}

,{name:'휴비츠', symbol: '065510'}

,{name:'굿센', symbol: '243870'}

,{name:'데이드림엔터', symbol: '348840'}

,{name:'듀켐바이오', symbol: '176750'}

,{name:'라온테크', symbol: '232680'}

,{name:'라이프사이언스테크놀로지', symbol: '285770'}

,{name:'명진홀딩스', symbol: '267060'}

,{name:'미래엔에듀파트너', symbol: '208890'}

,{name:'바이오인프라생명과학', symbol: '266470'}

,{name:'수프로', symbol: '185190'}

,{name:'에브리봇', symbol: '270660'}

,{name:'에스앤디', symbol: '260970'}

,{name:'에스에이티이엔지', symbol: '158300'}

,{name:'에스엠비나', symbol: '299670'}

,{name:'에이원알폼', symbol: '234070'}

,{name:'엠로', symbol: '058970'}

,{name:'엠앤씨생명과학', symbol: '225860'}

,{name:'원바이오젠', symbol: '278380'}

,{name:'유니포인트', symbol: '121060'}

,{name:'제노텍', symbol: '066830'}

,{name:'케어룸의료산업', symbol: '327970'}

,{name:'탑선', symbol: '180060'}

,{name:'파워풀엑스', symbol: '266870'}

,{name:'DB하이텍', symbol: '000990'}

,{name:'HSD엔진', symbol: '082740'}

,{name:'KG동부제철', symbol: '016380'}

,{name:'KTB투자증권', symbol: '030210'}

,{name:'KTcs', symbol: '058850'}

,{name:'LG생활건강', symbol: '051900'}

,{name:'SG세계물산', symbol: '004060'}

,{name:'SIMPAC', symbol: '009160'}

,{name:'SKC', symbol: '011790'}

,{name:'SK가스', symbol: '018670'}

,{name:'SK디앤디', symbol: '210980'}

,{name:'SK렌터카', symbol: '068400'}

,{name:'STX엔진', symbol: '077970'}

,{name:'STX중공업', symbol: '071970'}

,{name:'TCC스틸', symbol: '002710'}

,{name:'가온전선', symbol: '000500'}

,{name:'경보제약', symbol: '214390'}

,{name:'계양전기', symbol: '012200'}

,{name:'고려산업', symbol: '002140'}

,{name:'광전자', symbol: '017900'}

,{name:'기아자동차', symbol: '000270'}

,{name:'넥센', symbol: '005720'}

,{name:'넥스트사이언스', symbol: '003580'}

,{name:'농심', symbol: '004370'}

,{name:'다우기술', symbol: '023590'}

,{name:'대성산업', symbol: '128820'}

,{name:'대유플러스', symbol: '000300'}

,{name:'대한전선', symbol: '001440'}

,{name:'대한제분', symbol: '001130'}

,{name:'대한항공', symbol: '003490'}

,{name:'대한화섬', symbol: '003830'}

,{name:'동남합성', symbol: '023450'}

,{name:'동방', symbol: '004140'}

,{name:'동아타이어', symbol: '282690'}

,{name:'동양피스톤', symbol: '092780'}

,{name:'동원시스템즈', symbol: '014820'}

,{name:'디와이파워', symbol: '210540'}

,{name:'롯데리츠', symbol: '330590'}

,{name:'메리츠금융지주', symbol: '138040'}

,{name:'무림P&P', symbol: '009580'}

,{name:'미원상사', symbol: '002840'}

,{name:'방림', symbol: '003610'}

,{name:'보령제약', symbol: '003850'}

,{name:'사조오양', symbol: '006090'}

,{name:'삼아알미늄', symbol: '006110'}

,{name:'삼호개발', symbol: '010960'}

,{name:'삼화전자공업', symbol: '011230'}

,{name:'삼화페인트공업', symbol: '000390'}

,{name:'새론오토모티브', symbol: '075180'}

,{name:'성문전자', symbol: '014910'}

,{name:'세아제강지주', symbol: '003030'}

,{name:'솔루스첨단소재', symbol: '336370'}

,{name:'신세계I&C', symbol: '035510'}

,{name:'쌍방울', symbol: '102280'}

,{name:'쌍용양회공업', symbol: '003410'}

,{name:'아남전자', symbol: '008700'}

,{name:'아세아제지', symbol: '002310'}

,{name:'아시아나IDT', symbol: '267850'}

,{name:'애경유화', symbol: '161000'}

,{name:'에쓰씨엔지니어링', symbol: '023960'}

,{name:'에어부산', symbol: '298690'}

,{name:'에이엔피', symbol: '015260'}

,{name:'엔케이물산', symbol: '009810'}

,{name:'영흥', symbol: '012160'}

,{name:'오리엔트바이오', symbol: '002630'}

,{name:'오리온홀딩스', symbol: '001800'}

,{name:'용평리조트', symbol: '070960'}

,{name:'웅진', symbol: '016880'}

,{name:'원림', symbol: '005820'}

,{name:'유니퀘스트', symbol: '077500'}

,{name:'이엔플러스', symbol: '074610'}

,{name:'이지스밸류플러스리츠', symbol: '334890'}

,{name:'인바이오젠', symbol: '101140'}

,{name:'일동제약', symbol: '249420'}

,{name:'일신석재', symbol: '007110'}

,{name:'일양약품', symbol: '007570'}

,{name:'주연테크', symbol: '044380'}

,{name:'지코', symbol: '010580'}

,{name:'진양산업', symbol: '003780'}

,{name:'케이비아이동국실업', symbol: '001620'}

,{name:'케이씨', symbol: '029460'}

,{name:'케이티스카이라이프', symbol: '053210'}

,{name:'코오롱', symbol: '002020'}

,{name:'티웨이홀딩스', symbol: '004870'}

,{name:'파미셀', symbol: '005690'}

,{name:'평화홀딩스', symbol: '010770'}

,{name:'풀무원', symbol: '017810'}

,{name:'하이트진로홀딩스', symbol: '000140'}

,{name:'한국단자공업', symbol: '025540'}

,{name:'한국조선해양', symbol: '009540'}

,{name:'한국카본', symbol: '017960'}

,{name:'한농화성', symbol: '011500'}

,{name:'한미약품', symbol: '128940'}

,{name:'한신공영', symbol: '004960'}

,{name:'한익스프레스', symbol: '014130'}

,{name:'한전기술', symbol: '052690'}

,{name:'한화시스템', symbol: '272210'}

,{name:'한화투자증권', symbol: '003530'}

,{name:'현대글로비스', symbol: '086280'}

,{name:'현대중공업지주', symbol: '267250'}

,{name:'현대해상', symbol: '001450'}

,{name:'화승알앤에이', symbol: '013520'}

,{name:'효성중공업', symbol: '298040'}

,{name:'효성티앤씨', symbol: '298020'}

,{name:'GV', symbol: '045890'}

,{name:'HB테크놀러지', symbol: '078150'}

,{name:'IBKS제12호스팩', symbol: '335870'}

,{name:'ISC', symbol: '095340'}

,{name:'KG이니시스', symbol: '035600'}

,{name:'MP한강', symbol: '219550'}

,{name:'NE능률', symbol: '053290'}

,{name:'NHN한국사이버결제', symbol: '060250'}

,{name:'SBI인베스트먼트', symbol: '019550'}

,{name:'SG', symbol: '255220'}

,{name:'갤럭시아머니트리', symbol: '094480'}

,{name:'고려제약', symbol: '014570'}

,{name:'구영테크', symbol: '053270'}

,{name:'국일제지', symbol: '078130'}

,{name:'금강철강', symbol: '053260'}

,{name:'기가레인', symbol: '049080'}

,{name:'나노스', symbol: '151910'}

,{name:'나노캠텍', symbol: '091970'}

,{name:'나라엠앤디', symbol: '051490'}

,{name:'나우IB', symbol: '293580'}

,{name:'내츄럴엔도텍', symbol: '168330'}

,{name:'네오펙트', symbol: '290660'}

,{name:'녹십자엠에스', symbol: '142280'}

,{name:'녹십자웰빙', symbol: '234690'}

,{name:'뉴지랩', symbol: '214870'}

,{name:'대동기어', symbol: '008830'}

,{name:'대륙제관', symbol: '004780'}

,{name:'대모', symbol: '317850'}

,{name:'대보마그네틱', symbol: '290670'}

,{name:'대성창투', symbol: '027830'}

,{name:'대양제지', symbol: '006580'}

,{name:'대정화금', symbol: '120240'}

,{name:'대창스틸', symbol: '140520'}

,{name:'덕우전자', symbol: '263600'}

,{name:'동성화인텍', symbol: '033500'}

,{name:'동양에스텍', symbol: '060380'}

,{name:'동양이엔피', symbol: '079960'}

,{name:'동일철강', symbol: '023790'}

,{name:'디스플레이텍', symbol: '066670'}

,{name:'디에스케이', symbol: '109740'}

,{name:'디자인', symbol: '227100'}

,{name:'디젠스', symbol: '113810'}

,{name:'러셀', symbol: '217500'}

,{name:'레이', symbol: '228670'}

,{name:'매일유업', symbol: '267980'}

,{name:'맥스로텍', symbol: '141070'}

,{name:'멀티캠퍼스', symbol: '067280'}

,{name:'메가스터디', symbol: '072870'}

,{name:'메디프론', symbol: '065650'}

,{name:'명성티엔에스', symbol: '257370'}

,{name:'모바일어플라이언스', symbol: '087260'}

,{name:'미투온', symbol: '201490'}

,{name:'바른손', symbol: '018700'}

,{name:'바이오로그디바이스', symbol: '208710'}

,{name:'바이오솔루션', symbol: '086820'}

,{name:'바이오톡스텍', symbol: '086040'}

,{name:'버추얼텍', symbol: '036620'}

,{name:'베스파', symbol: '299910'}

,{name:'비나텍', symbol: '126340'}

,{name:'빅솔론', symbol: '093190'}

,{name:'삼목에스폼', symbol: '018310'}

,{name:'삼성스팩2호', symbol: '291230'}

,{name:'상상인', symbol: '038540'}

,{name:'상신전자', symbol: '263810'}

,{name:'서진시스템', symbol: '178320'}

,{name:'서플러스글로벌', symbol: '140070'}

,{name:'선익시스템', symbol: '171090'}

,{name:'성광벤드', symbol: '014620'}

,{name:'소프트센', symbol: '032680'}

,{name:'스타모빌리티', symbol: '158310'}

,{name:'신성델타테크', symbol: '065350'}

,{name:'신진에스엠', symbol: '138070'}

,{name:'심텍홀딩스', symbol: '036710'}

,{name:'쎌바이오텍', symbol: '049960'}

,{name:'씨티케이코스메틱스', symbol: '260930'}

,{name:'아모그린텍', symbol: '125210'}

,{name:'아미노로직스', symbol: '074430'}

,{name:'아이디스', symbol: '143160'}

,{name:'아이비김영', symbol: '339950'}

,{name:'아이앤씨', symbol: '052860'}

,{name:'아이에스이커머스', symbol: '069920'}

,{name:'아이엠', symbol: '101390'}

,{name:'아이엠텍', symbol: '226350'}

,{name:'아진엑스텍', symbol: '059120'}

,{name:'아톤', symbol: '158430'}

,{name:'알엔투테크놀로지', symbol: '148250'}

,{name:'알체라', symbol: '347860'}

,{name:'압타머사이언스', symbol: '291650'}

,{name:'액토즈소프트', symbol: '052790'}

,{name:'앤씨앤', symbol: '092600'}

,{name:'에스엠', symbol: '041510'}

,{name:'에스티아이', symbol: '039440'}

,{name:'에이치엘비제약', symbol: '047920'}

,{name:'에이치케이', symbol: '044780'}

,{name:'에이텍', symbol: '045660'}

,{name:'에코프로', symbol: '086520'}

,{name:'에코프로비엠', symbol: '247540'}

,{name:'엔에이치스팩17호', symbol: '359090'}

,{name:'엔에이치스팩18호', symbol: '365590'}

,{name:'오리엔탈정공', symbol: '014940'}

,{name:'오리콤', symbol: '010470'}

,{name:'오션브릿지', symbol: '241790'}

,{name:'오스템', symbol: '031510'}

,{name:'우리기술', symbol: '032820'}

,{name:'우리로', symbol: '046970'}

,{name:'우정바이오', symbol: '215380'}

,{name:'원방테크', symbol: '053080'}

,{name:'원익홀딩스', symbol: '030530'}

,{name:'월덱스', symbol: '101160'}

,{name:'웰크론한텍', symbol: '076080'}

,{name:'웹스', symbol: '196700'}

,{name:'윙입푸드', symbol: '900340'}

,{name:'유니셈', symbol: '036200'}

,{name:'유니트론텍', symbol: '142210'}

,{name:'유진기업', symbol: '023410'}

,{name:'유진로봇', symbol: '056080'}

,{name:'이노와이즈', symbol: '086250'}

,{name:'이노인스트루먼트', symbol: '215790'}

,{name:'이라이콤', symbol: '041520'}

,{name:'이베스트투자증권', symbol: '078020'}

,{name:'이엑스티', symbol: '226360'}

,{name:'이엔에프테크놀로지', symbol: '102710'}

,{name:'이원컴포텍', symbol: '088290'}

,{name:'이크레더블', symbol: '092130'}

,{name:'이화전기', symbol: '024810'}

,{name:'인트로메딕', symbol: '150840'}

,{name:'인트론바이오', symbol: '048530'}

,{name:'인포뱅크', symbol: '039290'}

,{name:'인프라웨어', symbol: '041020'}

,{name:'일야', symbol: '058450'}

,{name:'일진파워', symbol: '094820'}

,{name:'제노포커스', symbol: '187420'}

,{name:'제닉', symbol: '123330'}

,{name:'제룡산업', symbol: '147830'}

,{name:'젠큐릭스', symbol: '229000'}

,{name:'중앙에너비스', symbol: '000440'}

,{name:'지엘팜텍', symbol: '204840'}

,{name:'지티지웰니스', symbol: '219750'}

,{name:'진매트릭스', symbol: '109820'}

,{name:'창해에탄올', symbol: '004650'}

,{name:'청담러닝', symbol: '096240'}

,{name:'컬러레이', symbol: '900310'}

,{name:'케어랩스', symbol: '263700'}

,{name:'케어젠', symbol: '214370'}

,{name:'케이엔제이', symbol: '272110'}

,{name:'케이엠', symbol: '083550'}

,{name:'케이엠제약', symbol: '225430'}

,{name:'케이프', symbol: '064820'}

,{name:'켐트로닉스', symbol: '089010'}

,{name:'켐트로스', symbol: '220260'}

,{name:'코다코', symbol: '046070'}

,{name:'코리아에프티', symbol: '123410'}

,{name:'코센', symbol: '009730'}

,{name:'코퍼스코리아', symbol: '322780'}

,{name:'큐로홀딩스', symbol: '051780'}

,{name:'티피씨글로벌', symbol: '130740'}

,{name:'파크시스템스', symbol: '140860'}

,{name:'파트론', symbol: '091700'}

,{name:'팬젠', symbol: '222110'}

,{name:'포스코엠텍', symbol: '009520'}

,{name:'포인트엔지니어링', symbol: '256630'}

,{name:'포티스', symbol: '141020'}

,{name:'피앤씨테크', symbol: '237750'}

,{name:'필로시스헬스케어', symbol: '057880'}

,{name:'하나머스트제6호스팩', symbol: '307160'}

,{name:'하림지주', symbol: '003380'}

,{name:'하이제5호스팩', symbol: '340120'}

,{name:'하이텍팜', symbol: '106190'}

,{name:'한국가구', symbol: '004590'}

,{name:'한국정밀기계', symbol: '101680'}

,{name:'한빛소프트', symbol: '047080'}

,{name:'한스바이오메드', symbol: '042520'}

,{name:'현대바이오랜드', symbol: '052260'}

,{name:'현대통신', symbol: '039010'}

,{name:'휘닉스소재', symbol: '050090'}

,{name:'휴림로봇', symbol: '090710'}

,{name:'KC산업', symbol: '112190'}

,{name:'나우코스', symbol: '257990'}

,{name:'노브메타파마', symbol: '229500'}

,{name:'대동고려삼', symbol: '178600'}

,{name:'더콘텐츠온', symbol: '302920'}

,{name:'볼빅', symbol: '206950'}

,{name:'뿌리깊은나무들', symbol: '266170'}

,{name:'스템랩', symbol: '258540'}

,{name:'시그넷이브이', symbol: '260870'}

,{name:'시큐센', symbol: '232830'}

,{name:'씨엔티드림', symbol: '286000'}

,{name:'에스엔피제네틱스', symbol: '086460'}

,{name:'에이스캠퍼', symbol: '322190'}

,{name:'엔솔바이오사이언스', symbol: '140610'}

,{name:'옐로페이', symbol: '179720'}

,{name:'원포유', symbol: '122830'}

,{name:'인터코스', symbol: '240340'}

,{name:'질경이', symbol: '233990'}

,{name:'크로넥스', symbol: '215570'}

,{name:'파마리서치바이오', symbol: '217950'}

,{name:'판도라티비', symbol: '202960'}

,{name:'피노텍', symbol: '150440'}

,{name:'BYC', symbol: '001460'}

,{name:'DB손해보험', symbol: '005830'}

,{name:'GS', symbol: '078930'}

,{name:'HMM', symbol: '011200'}

,{name:'JB금융지주', symbol: '175330'}

,{name:'LS네트웍스', symbol: '000680'}

,{name:'NH투자증권', symbol: '005940'}

,{name:'SK', symbol: '034730'}

,{name:'SK디스커버리', symbol: '006120'}

,{name:'강남제비스코', symbol: '000860'}

,{name:'경동나비엔', symbol: '009450'}

,{name:'광명전기', symbol: '017040'}

,{name:'교촌에프앤비', symbol: '339770'}

,{name:'그린케미칼', symbol: '083420'}

,{name:'금호석유화학', symbol: '011780'}

,{name:'금호에이치티', symbol: '214330'}

,{name:'깨끗한나라', symbol: '004540'}

,{name:'남광토건', symbol: '001260'}

,{name:'노루홀딩스', symbol: '000320'}

,{name:'대동공업', symbol: '000490'}

,{name:'대상홀딩스', symbol: '084690'}

,{name:'대성에너지', symbol: '117580'}

,{name:'대우부품', symbol: '009320'}

,{name:'대우조선해양', symbol: '042660'}

,{name:'대원전선', symbol: '006340'}

,{name:'대창단조', symbol: '015230'}

,{name:'대현', symbol: '016090'}

,{name:'도화엔지니어링', symbol: '002150'}

,{name:'동성화학', symbol: '005190'}

,{name:'동아지질', symbol: '028100'}

,{name:'동일고무벨트', symbol: '163560'}

,{name:'동일산업', symbol: '004890'}

,{name:'동일제강', symbol: '002690'}

,{name:'두올', symbol: '016740'}

,{name:'드림텍', symbol: '192650'}

,{name:'롯데지주', symbol: '004990'}

,{name:'모나리자', symbol: '012690'}

,{name:'무림페이퍼', symbol: '009200'}

,{name:'미래산업', symbol: '025560'}

,{name:'미래에셋대우', symbol: '006800'}

,{name:'보해양조', symbol: '000890'}

,{name:'빅히트', symbol: '352820'}

,{name:'삼화콘덴서공업', symbol: '001820'}

,{name:'상신브레이크', symbol: '041650'}

,{name:'서울도시가스', symbol: '017390'}

,{name:'성안', symbol: '011300'}

,{name:'신대양제지', symbol: '016590'}

,{name:'신도리코', symbol: '029530'}

,{name:'신흥', symbol: '004080'}

,{name:'쎌마테라퓨틱스', symbol: '015540'}

,{name:'씨에스윈드', symbol: '112610'}

,{name:'아모레퍼시픽그룹', symbol: '002790'}

,{name:'에스원', symbol: '012750'}

,{name:'에스케이바이오팜', symbol: '326030'}

,{name:'에이프로젠제약', symbol: '003060'}

,{name:'영풍제지', symbol: '006740'}

,{name:'예스코홀딩스', symbol: '015360'}

,{name:'우리들제약', symbol: '004720'}

,{name:'우리종금', symbol: '010050'}

,{name:'우진아이엔에스', symbol: '010400'}

,{name:'웅진씽크빅', symbol: '095720'}

,{name:'유수홀딩스', symbol: '000700'}

,{name:'유엔젤', symbol: '072130'}

,{name:'이지스레지던스리츠', symbol: '350520'}

,{name:'이화산업', symbol: '000760'}

,{name:'인팩', symbol: '023810'}

,{name:'일신방직', symbol: '003200'}

,{name:'일진디스플', symbol: '020760'}

,{name:'일진머티리얼즈', symbol: '020150'}

,{name:'제주은행', symbol: '006220'}

,{name:'제주항공', symbol: '089590'}

,{name:'종근당', symbol: '185750'}

,{name:'진양홀딩스', symbol: '100250'}

,{name:'천일고속', symbol: '000650'}

,{name:'체시스', symbol: '033250'}

,{name:'카프로', symbol: '006380'}

,{name:'케이티앤지', symbol: '033780'}

,{name:'태광산업', symbol: '003240'}

,{name:'태영건설', symbol: '009410'}

,{name:'풍산', symbol: '103140'}

,{name:'하나금융지주', symbol: '086790'}

,{name:'한국가스공사', symbol: '036460'}

,{name:'한국전력공사', symbol: '015760'}

,{name:'한국콜마', symbol: '161890'}

,{name:'한성기업', symbol: '003680'}

,{name:'한세예스24홀딩스', symbol: '016450'}

,{name:'한일시멘트', symbol: '300720'}

,{name:'한일홀딩스', symbol: '003300'}

,{name:'한전KPS', symbol: '051600'}

,{name:'한진칼', symbol: '180640'}

,{name:'한창', symbol: '005110'}

,{name:'현대건설', symbol: '000720'}

,{name:'현대그린푸드', symbol: '005440'}

,{name:'현대로템', symbol: '064350'}

,{name:'현대미포조선', symbol: '010620'}

,{name:'현대약품', symbol: '004310'}

,{name:'현대종합상사', symbol: '011760'}

,{name:'화신', symbol: '010690'}

,{name:'휴켐스', symbol: '069260'}

,{name:'흥국화재', symbol: '000540'}

,{name:'AP시스템', symbol: '265520'}

,{name:'AP위성', symbol: '211270'}

,{name:'GRT', symbol: '900290'}

,{name:'MP그룹', symbol: '065150'}

,{name:'OQP', symbol: '078590'}

,{name:'PI첨단소재', symbol: '178920'}

,{name:'S&K폴리텍', symbol: '091340'}

,{name:'SFA반도체', symbol: '036540'}

,{name:'SGC이테크건설', symbol: '016250'}

,{name:'THE E&M', symbol: '089230'}

,{name:'THE MIDONG', symbol: '161570'}

,{name:'TJ미디어', symbol: '032540'}

,{name:'YTN', symbol: '040300'}

,{name:'골프존뉴딘홀딩스', symbol: '121440'}

,{name:'교보10호기업인수목적', symbol: '355150'}

,{name:'글로벌에스엠', symbol: '900070'}

,{name:'금화피에스시', symbol: '036190'}

,{name:'까스텔바작', symbol: '308100'}

,{name:'나무가', symbol: '190510'}

,{name:'네온테크', symbol: '306620'}

,{name:'녹십자랩셀', symbol: '144510'}

,{name:'농우바이오', symbol: '054050'}

,{name:'뉴로스', symbol: '126870'}

,{name:'뉴트리', symbol: '270870'}

,{name:'다나와', symbol: '119860'}

,{name:'다믈멀티미디어', symbol: '093640'}

,{name:'다우데이타', symbol: '032190'}

,{name:'대동스틸', symbol: '048470'}

,{name:'대신밸런스제8호스팩', symbol: '336570'}

,{name:'대한광통신', symbol: '010170'}

,{name:'더네이쳐홀딩스', symbol: '298540'}

,{name:'데이타솔루션', symbol: '263800'}

,{name:'덱스터', symbol: '206560'}

,{name:'도이치모터스', symbol: '067990'}

,{name:'동국산업', symbol: '005160'}

,{name:'동원개발', symbol: '013120'}

,{name:'동일금속', symbol: '109860'}

,{name:'동화기업', symbol: '025900'}

,{name:'드래곤플라이', symbol: '030350'}

,{name:'드림시큐리티', symbol: '203650'}

,{name:'디딤', symbol: '217620'}

,{name:'디와이피엔에프', symbol: '104460'}

,{name:'디지캡', symbol: '197140'}

,{name:'디지탈옵틱', symbol: '106520'}

,{name:'레드로버', symbol: '060300'}

,{name:'로보티즈', symbol: '108490'}

,{name:'로체시스템즈', symbol: '071280'}

,{name:'루멘스', symbol: '038060'}

,{name:'루트로닉', symbol: '085370'}

,{name:'리노공업', symbol: '058470'}

,{name:'마이더스AI', symbol: '222810'}

,{name:'마이크로디지탈', symbol: '305090'}

,{name:'마크로젠', symbol: '038290'}

,{name:'매커스', symbol: '093520'}

,{name:'메디아나', symbol: '041920'}

,{name:'멜파스', symbol: '096640'}

,{name:'모바일리더', symbol: '100030'}

,{name:'미래생명자원', symbol: '218150'}

,{name:'바른전자', symbol: '064520'}

,{name:'배럴', symbol: '267790'}

,{name:'백금T&A', symbol: '046310'}

,{name:'버킷스튜디오', symbol: '066410'}

,{name:'보성파워텍', symbol: '006910'}

,{name:'브이원텍', symbol: '251630'}

,{name:'브이티지엠피', symbol: '018290'}

,{name:'비비씨', symbol: '318410'}

,{name:'비씨월드제약', symbol: '200780'}

,{name:'비아트론', symbol: '141000'}

,{name:'비츠로시스', symbol: '054220'}

,{name:'빛샘전자', symbol: '072950'}

,{name:'삼기', symbol: '122350'}

,{name:'상상인이안제2호스팩', symbol: '329560'}

,{name:'상상인인더스트리', symbol: '101000'}

,{name:'서남', symbol: '294630'}

,{name:'서울리거', symbol: '043710'}

,{name:'서울제약', symbol: '018680'}

,{name:'서전기전', symbol: '189860'}

,{name:'서희건설', symbol: '035890'}

,{name:'세중', symbol: '039310'}

,{name:'센트럴바이오', symbol: '051980'}

,{name:'셀트리온헬스케어', symbol: '091990'}

,{name:'솔브레인홀딩스', symbol: '036830'}

,{name:'솔트룩스', symbol: '304100'}

,{name:'쇼박스', symbol: '086980'}

,{name:'슈프리마아이디', symbol: '317770'}

,{name:'신신제약', symbol: '002800'}

,{name:'신영스팩6호', symbol: '344050'}

,{name:'신일제약', symbol: '012790'}

,{name:'싸이맥스', symbol: '160980'}

,{name:'썸에이지', symbol: '208640'}

,{name:'쏠리드', symbol: '050890'}

,{name:'씨아이에스', symbol: '222080'}

,{name:'씨에스베어링', symbol: '297090'}

,{name:'아난티', symbol: '025980'}

,{name:'아바코', symbol: '083930'}

,{name:'아세아텍', symbol: '050860'}

,{name:'아스트', symbol: '067390'}

,{name:'아이스크림에듀', symbol: '289010'}

,{name:'아이엠이연이', symbol: '090740'}

,{name:'아이텍', symbol: '119830'}

,{name:'아이티엠반도체', symbol: '084850'}

,{name:'알로이스', symbol: '297570'}

,{name:'양지사', symbol: '030960'}

,{name:'얼라인드', symbol: '238120'}

,{name:'에스씨디', symbol: '042110'}

,{name:'에스에프에이', symbol: '056190'}

,{name:'에스텍', symbol: '069510'}

,{name:'에스폴리텍', symbol: '050760'}

,{name:'에스피시스템스', symbol: '317830'}

,{name:'에이디테크놀로지', symbol: '200710'}

,{name:'에이치엘비생명과학', symbol: '067630'}

,{name:'에이치엘비파워', symbol: '043220'}

,{name:'에이치엠씨제5호스팩', symbol: '353060'}

,{name:'에이테크솔루션', symbol: '071670'}

,{name:'에이트원', symbol: '230980'}

,{name:'에치에프알', symbol: '230240'}

,{name:'엔에이치스팩14호', symbol: '319400'}

,{name:'엔에이치스팩16호', symbol: '353190'}

,{name:'엔젠바이오', symbol: '354200'}

,{name:'엔투텍', symbol: '227950'}

,{name:'엘앤에프', symbol: '066970'}

,{name:'엘티씨', symbol: '170920'}

,{name:'엠투엔', symbol: '033310'}

,{name:'영우디에스피', symbol: '143540'}

,{name:'영풍정밀', symbol: '036560'}

,{name:'예선테크', symbol: '250930'}

,{name:'오리엔트정공', symbol: '065500'}

,{name:'오스코텍', symbol: '039200'}

,{name:'오파스넷', symbol: '173130'}

,{name:'올릭스', symbol: '226950'}

,{name:'옴니시스템', symbol: '057540'}

,{name:'와토스코리아', symbol: '079000'}

,{name:'우리산업', symbol: '215360'}

,{name:'우리이앤엘', symbol: '153490'}

,{name:'우원개발', symbol: '046940'}

,{name:'위즈코프', symbol: '038620'}

,{name:'윈팩', symbol: '097800'}

,{name:'유비케어', symbol: '032620'}

,{name:'유안타제3호스팩', symbol: '287410'}

,{name:'유앤아이', symbol: '056090'}

,{name:'유진스팩4호', symbol: '321260'}

,{name:'이노메트리', symbol: '302430'}

,{name:'이노테라피', symbol: '246960'}

,{name:'이디티', symbol: '215090'}

,{name:'이루다', symbol: '164060'}

,{name:'이매진아시아', symbol: '036260'}

,{name:'이베스트이안스팩1호', symbol: '323210'}

,{name:'이씨에스', symbol: '067010'}

,{name:'이엔드디', symbol: '101360'}

,{name:'이오테크닉스', symbol: '039030'}

,{name:'인바이오', symbol: '352940'}

,{name:'인터로조', symbol: '119610'}

,{name:'인화정공', symbol: '101930'}

,{name:'자연과환경', symbol: '043910'}

,{name:'정산애강', symbol: '022220'}

,{name:'제이브이엠', symbol: '054950'}

,{name:'제이엔케이히터', symbol: '126880'}

,{name:'제일테크노스', symbol: '038010'}

,{name:'제테마', symbol: '216080'}

,{name:'지노믹트리', symbol: '228760'}

,{name:'지어소프트', symbol: '051160'}

,{name:'지에스이', symbol: '053050'}

,{name:'지엔원에너지', symbol: '270520'}

,{name:'지와이커머스', symbol: '111820'}

,{name:'진양제약', symbol: '007370'}

,{name:'차바이오텍', symbol: '085660'}

,{name:'천랩', symbol: '311690'}

,{name:'케이맥', symbol: '043290'}

,{name:'케이엘넷', symbol: '039420'}

,{name:'케이프이에스제4호', symbol: '347140'}

,{name:'코너스톤네트웍스', symbol: '033110'}

,{name:'코렌텍', symbol: '104540'}

,{name:'코리아나', symbol: '027050'}

,{name:'코스맥스엔비티', symbol: '222040'}

,{name:'코오롱티슈진', symbol: '950160'}

,{name:'코윈테크', symbol: '282880'}

,{name:'코콤', symbol: '015710'}

,{name:'퀀타매트릭스', symbol: '317690'}

,{name:'큐에스아이', symbol: '066310'}

,{name:'크루셜텍', symbol: '114120'}

,{name:'크리스에프앤씨', symbol: '110790'}

,{name:'클라우드에어', symbol: '036170'}

,{name:'테스', symbol: '095610'}

,{name:'텔레칩스', symbol: '054450'}

,{name:'텔레필드', symbol: '091440'}

,{name:'톱텍', symbol: '108230'}

,{name:'티비씨', symbol: '033830'}

,{name:'티플랙스', symbol: '081150'}

,{name:'파나진', symbol: '046210'}

,{name:'파워로직스', symbol: '047310'}

,{name:'파이오링크', symbol: '170790'}

,{name:'포비스티앤씨', symbol: '016670'}

,{name:'포시에스', symbol: '189690'}

,{name:'푸른기술', symbol: '094940'}

,{name:'퓨전', symbol: '195440'}

,{name:'프럼파스트', symbol: '035200'}

,{name:'플리토', symbol: '300080'}

,{name:'피엔케이피부임상연구센타', symbol: '347740'}

,{name:'피제이전자', symbol: '006140'}

,{name:'하림', symbol: '136480'}

,{name:'하이록코리아', symbol: '013030'}

,{name:'하이비젼시스템', symbol: '126700'}

,{name:'하츠', symbol: '066130'}

,{name:'한국정보공학', symbol: '039740'}

,{name:'한네트', symbol: '052600'}

,{name:'한라IMS', symbol: '092460'}

,{name:'한양이엔지', symbol: '045100'}

,{name:'한프', symbol: '066110'}

,{name:'해덕파워웨이', symbol: '102210'}

,{name:'해성옵틱스', symbol: '076610'}

,{name:'행남사', symbol: '008800'}

,{name:'홈센타홀딩스', symbol: '060560'}

,{name:'힘스', symbol: '238490'}

,{name:'SGA클라우드서비스', symbol: '224880'}

,{name:'관악산업', symbol: '076340'}

,{name:'나라소프트', symbol: '288490'}

,{name:'메디젠휴먼케어', symbol: '236340'}

,{name:'씨이랩', symbol: '189330'}

,{name:'아이피몬스터', symbol: '223220'}

,{name:'엄지하우스', symbol: '224810'}

,{name:'에스케이씨에스', symbol: '224020'}

,{name:'에이펙스인텍', symbol: '207490'}

,{name:'엔에스엠', symbol: '238170'}

,{name:'원텍', symbol: '216280'}

,{name:'이노진', symbol: '344860'}

,{name:'지앤이헬스케어', symbol: '299480'}

,{name:'코셋', symbol: '189350'}

,{name:'툴젠', symbol: '199800'}

,{name:'플럼라인생명과학', symbol: '222670'}

,{name:'피엔에이치테크', symbol: '239890'}

,{name:'한국미라클피플사', symbol: '331660'}

,{name:'휴벡셀', symbol: '212310'}]




const isDev = process.env.PORT ? true : false;

let webString = "데이터 준비중입니다.";
let date = new Date();

const getIssueObject = async (name, symbol, from_time) => {
    return new Promise(async (resolve, reject) => {

        try{
            let history_obj = await history.getHistory(symbol, from_time, Date.now());
            let history_arr = history.transferObjToArr(history_obj);
            history_arr = history.calcMovingAverage25(history_arr);
            history_arr = history.calcDifferenceRate(history_arr);

            history_arr = statistics.calcCeilDifferenceRate(history_arr);
            
            let issue_obj = {};
            
            issue_obj.name = name;
            issue_obj.price = history_arr[history_arr.length-1].close_price;
            issue_obj.ma25 = history_arr[history_arr.length-1].ma25;
            issue_obj.difference_rate = history_arr[history_arr.length-1].difference_rate;
            issue_obj.ceiled_difference_rate = history_arr[history_arr.length-1].ceiled_difference_rate;
            issue_obj.in_3_days = statistics.calcNdaySuccessRate(history_arr, 3, target_profit);
            issue_obj.in_3_days.profit_rate = statistics.calcNdayProfitRate(history_arr, 3);
            issue_obj.in_5_days = statistics.calcNdaySuccessRate(history_arr, 5, target_profit);
            issue_obj.in_5_days.profit_rate = statistics.calcNdayProfitRate(history_arr, 5);
            issue_obj.in_7_days = statistics.calcNdaySuccessRate(history_arr, 7, target_profit);
            issue_obj.in_7_days.profit_rate = statistics.calcNdayProfitRate(history_arr, 7);

            console.log(`종목/괴리율: ${issue_obj.name}/${floor2Digits(issue_obj.difference_rate)}%`);

            resolve(issue_obj);
        }catch(err){
            console.error("getIssueObject",err)
            reject(err);
        }
    });
}

const main = async (stocks_arr) => {
    let issue_obj_arr = [];

    for(let i = 0; i < stocks_arr.length; i++) {
        try{
            issue_obj_arr.push(await getIssueObject(stocks_arr[i].name, stocks_arr[i].symbol, '1245660137'));
        }catch(err){
            console.error(err)
        }
        
    }

    issue_obj_arr.sort((a, b) => {
        return a.difference_rate - b.difference_rate;
    })

    webString = '';

    for(let i = 0; i < issue_obj_arr.length; i++) {
        let issue_obj = issue_obj_arr[i];        
        if(isDev){
            console.log(`종목                : ${issue_obj.name}`);
            console.log(`현재가격           : ${issue_obj.price}`);
            console.log(`25일이동평균가격    : ${issue_obj.ma25}`);
            console.log(`현재괴리율         : ${floor2Digits(issue_obj.difference_rate)}%`);
            console.log(`3일내 ${target_profit}%상승    : ${issue_obj.in_3_days.success_count}%(+${floor2Digits(issue_obj.in_3_days.profit_rate)}%)`);
            console.log(`5일내 ${target_profit}%상승    : ${issue_obj.in_5_days.success_count}%(+${floor2Digits(issue_obj.in_5_days.profit_rate)}%)`);
            console.log(`7일내 ${target_profit}%상승    : ${issue_obj.in_7_days.success_count}%(+${floor2Digits(issue_obj.in_7_days.profit_rate)}%)`);
        }

        webString += `종목                : ${issue_obj.name}<br>`;
        webString += `현재가격           : ${issue_obj.price}<br>`;
        webString += `25일이동평균가격    : ${issue_obj.ma25}<br>`;
        webString += `현재괴리율         : ${floor2Digits(issue_obj.difference_rate)}%<br>`;
        webString += `3일내 ${target_profit}%상승    : ${issue_obj.in_3_days.success_count}%(+${floor2Digits(issue_obj.in_3_days.profit_rate)}%)<br>`;
        webString += `5일내 ${target_profit}%상승    : ${issue_obj.in_5_days.success_count}%(+${floor2Digits(issue_obj.in_5_days.profit_rate)}%)<br>`;
        webString += `7일내 ${target_profit}%상승    : ${issue_obj.in_7_days.success_count}%(+${floor2Digits(issue_obj.in_7_days.profit_rate)}%)<br><br>`;

    }
    if( isDev ){
        console.log(webString);
    }
    
    date = new Date();
    main(stocks_arr);
}

app.get('/', (req, res) => {
    res.send(`<meta name="viewport" content="width=device-width, initial-scale=1"> ${date}에 최신화되었습니다.<br>아래 데이터들은 괴리율을 기준으로 오름차순 정렬되어있습니다.<br>` + webString);
});
const server = app.listen(process.env.PORT || 3000, () => { 
    console.log('Server is running!');
});

/* Prevent Sleep in Heroku Server */
var http = require(process.env.PORT ?"https":"http");
try{
    http.get(process.env.PORT ? "https://like-bnf.herokuapp.com":"http://localhost:3000");
}catch(e){
    console.error(e);
}

setInterval(function () {
    try {
        console.log("setInterval.");
        http.get(process.env.PORT ? "https://like-bnf.herokuapp.com":"http://localhost:3000");    
    } catch (e) {
        console.error(e);
    }
    
}, 600000); // every 10 minutes
 
main(kospi100_kosdaq100_arr);