const history = require('./history');
const statistics = require('./statistics');
const floor2Digits = require('./util').floor2Digits;
const express = require('express');
const app = express();

const target_profit = 3;

const kospi50_arr = [{name : 'KB금융', symbol : '43413'}, {name : 'KT', symbol : '43507'}, {name : 'KT&G', symbol : '43480'}, {name : 'LG', symbol : '43508'}, {name : 'LG Electronics', symbol : '43348'}, {name : 'LG디스플레이', symbol : '43463'}, {name : 'LG생활건강', symbol : '43521'}, {name : 'LG유플러스', symbol : '43492'}, {name : 'LG화학', symbol : '43424'}, {name : 'S-oil', symbol : '43473'}, {name : 'SK Telecom', symbol : '43472'}, {name : 'SK그룹', symbol : '43520'}, {name : 'SK이노베이션', symbol : '43404'}, {name : 'SK하이닉스', symbol : '43430'}, {name : 'Woori Financial', symbol : '1131302'}, {name : '강원랜드', symbol : '43422'}, {name : '고려아연', symbol : '43381'}, {name : '기아차', symbol : '43460'}, {name : '기업은행', symbol : '43542'}, {name : '네이버 주식회사', symbol : '43493'}, {name : '넷마블', symbol : '1010663'}, {name : '롯데쇼핑', symbol : '43383'}, {name : '롯데케미칼', symbol : '43374'}, {name : '삼성SDI', symbol : '43450'}, {name : '삼성물산', symbol : '43477'}, {name : '삼성바이오로직스', symbol : '993256'}, {name : '삼성생명', symbol : '43428'}, {name : '삼성에스디에스', symbol : '948394'}, {name : '삼성전기', symbol : '43350'}, {name : '삼성전자', symbol : '43433'}, {name : '삼성화재해상보험', symbol : '43370'}, {name : '셀트리온', symbol : '979618'}, {name : '신한지주', symbol : '43453'}, {name : '아모레G', symbol : '43443'}, {name : '아모레퍼시픽', symbol : '43416'}, {name : '엔씨소프트', symbol : '43448'}, {name : '이마트', symbol : '44089'}, {name : '카카오', symbol : '979247'}, {name : '코웨이', symbol : '43524'}, {name : '포스코', symbol : '43531'}, {name : '하나금융지주', symbol : '43378'}, {name : '한국전력', symbol : '43525'}, {name : '한국타이어', symbol : '44101'}, {name : '한미사이언스', symbol : '43783'}, {name : '현대건설', symbol : '43371'}, {name : '현대글로비스', symbol : '43379'}, {name : '현대모비스', symbol : '43398'}, {name : '현대제철', symbol : '43400'}, {name : '현대중공업', symbol : '43541'}, {name : '현대차', symbol : '43399'}];
const krx100_arr = [{name : 'BGF', symbol : '940988'}, {name : 'BNK 금융그룹', symbol : '43414'}, {name : 'CJ CGV', symbol : '43992'}, {name : 'CJ ENM', symbol : '979248'}, {name : 'CJ 그룹', symbol : '43499'}, {name : 'CJ대한통운', symbol : '43377'}, {name : 'CJ제일제당', symbol : '43376'}, {name : 'GKL', symbol : '44066'}, {name : 'GS 그룹', symbol : '43497'}, {name : 'GS리테일', symbol : '43751'}, {name : 'Hyundai Robotics', symbol : '1010641'}, {name : 'JYP Ent.', symbol : '979251'}, {name : 'KB금융', symbol : '43413'}, {name : 'KCC', symbol : '43537'}, {name : 'KT', symbol : '43507'}, {name : 'KT&G', symbol : '43480'}, {name : 'LG', symbol : '43508'}, {name : 'LG Electronics', symbol : '43348'}, {name : 'LG디스플레이', symbol : '43463'}, {name : 'LG생활건강', symbol : '43521'}, {name : 'LG유플러스', symbol : '43492'}, {name : 'LG이노텍', symbol : '43465'}, {name : 'LG화학', symbol : '43424'}, {name : 'Lotte', symbol : '43454'}, {name : 'OCI', symbol : '43469'}, {name : 'Posco Chemical', symbol : '979031'}, {name : 'S-oil', symbol : '43473'}, {name : 'SK Telecom', symbol : '43472'}, {name : 'SK그룹', symbol : '43520'}, {name : 'SK머티리얼즈', symbol : '979264'}, {name : 'SK이노베이션', symbol : '43404'}, {name : 'SK하이닉스', symbol : '43430'}, {name : 'Woori Financial', symbol : '1131302'}, {name : '강원랜드', symbol : '43422'}, {name : '고려아연', symbol : '43381'}, {name : '고영', symbol : '979813'}, {name : '금호석유', symbol : '43347'}, {name : '기아차', symbol : '43460'}, {name : '기업은행', symbol : '43542'}, {name : '네이버 주식회사', symbol : '43493'}, {name : '녹십자', symbol : '43503'}, {name : '농심', symbol : '43494'}, {name : '대림산업', symbol : '43456'}, {name : '대한 유화', symbol : '43533'}, {name : '동부화재', symbol : '43455'}, {name : '롯데케미칼', symbol : '43374'}, {name : '메디톡스', symbol : '979729'}, {name : '메리츠종금증권', symbol : '43775'}, {name : '미래에셋대우', symbol : '43441'}, {name : '삼성SDI', symbol : '43450'}, {name : '삼성물산', symbol : '43477'}, {name : '삼성생명', symbol : '43428'}, {name : '삼성에스디에스', symbol : '948394'}, {name : '삼성전기', symbol : '43350'}, {name : '삼성전자', symbol : '43433'}, {name : '삼성증권', symbol : '43407'}, {name : '삼성카드', symbol : '43427'}, {name : '삼성화재해상보험', symbol : '43370'}, {name : '셀트리온', symbol : '979618'}, {name : '신세계', symbol : '43484'}, {name : '신한지주', symbol : '43453'}, {name : '아모레G', symbol : '43443'}, {name : '아모레퍼시픽', symbol : '43416'}, {name : '에스에프에이', symbol : '979505'}, {name : '에스원', symbol : '43495'}, {name : '엔씨소프트', symbol : '43448'}, {name : '영원무역', symbol : '44065'}, {name : '오뚜기', symbol : '43518'}, {name : '오리온', symbol : '1031094'}, {name : '유한양행', symbol : '43532'}, {name : '이마트', symbol : '44089'}, {name : '제일기획', symbol : '43352'}, {name : '카카오', symbol : '979247'}, {name : '컴투스', symbol : '979666'}, {name : '코스맥스', symbol : '940989'}, {name : '코웨이', symbol : '43524'}, {name : '키움증권', symbol : '43955'}, {name : '포스코', symbol : '43531'}, {name : '포스코 대우', symbol : '43535'}, {name : '하나금융지주', symbol : '43378'}, {name : '한국전력', symbol : '43525'}, {name : '한국콜마', symbol : '44102'}, {name : '한국타이어', symbol : '44101'}, {name : '한국투자금융지주', symbol : '43540'}, {name : '한국항공우주', symbol : '43962'}, {name : '한미사이언스', symbol : '43783'}, {name : '한미약품', symbol : '43440'}, {name : '한샘', symbol : '43791'}, {name : '한온시스템', symbol : '43346'}, {name : '한전KPS', symbol : '43964'}, {name : '한화케미칼', symbol : '43457'}, {name : '현대건설', symbol : '43371'}, {name : '현대글로비스', symbol : '43379'}, {name : '현대모비스', symbol : '43398'}, {name : '현대백화점', symbol : '43372'}, {name : '현대제철', symbol : '43400'}, {name : '현대중공업', symbol : '43541'}, {name : '현대차', symbol : '43399'}, {name : '현대해상', symbol : '43590'}, {name : '효성', symbol : '43506'}];
const kb_kstar_etf_arr = [{name : 'KB KSTAR KOSPI 200', symbol : '953389'}, {name : 'KB KSTAR Short-term MSB', symbol : '953392'}, {name : 'KB KBSTAR KOSDAQ150 ETF', symbol : '1031343'}, {name : 'KB KBSTAR Short-term KTB Active', symbol : '1031354'}, {name : 'KB KBSTAR KRX300', symbol : '1073393'}, {name : 'KB KSTAR Credit Bond', symbol : '953382'}, {name : 'KB KBSTAR F-KOSDAQ150 Inverse', symbol : '1031351'}, {name : 'KB KSTAR Top5 Group', symbol : '953394'}, {name : 'KB KBSTAR Mid Small Cap High Dividend', symbol : '1055055'}, {name : 'KB KBSTAR 200 Heavy Industries', symbol : '1056438'}, {name : 'KB KSTAR Korea Treasury Bond', symbol : '953387'}, {name : 'KB KBSTAR 200 Constructions', symbol : '1057214'}, {name : 'KB KSTAR Prime Industry', symbol : '953391'}, {name : 'KB KBSTAR 200 Energy & Chemicals', symbol : '1056436'}, {name : 'KB KBSTAR 200 Steels & Materials', symbol : '1056439'}, {name : 'KB KSTAR Fixed Income Balanced-Derivatives', symbol : '953385'}, {name : 'KB KBSTAR High Dividend', symbol : '1014024'}, {name : 'KB KBSTAR KTB 10Y Futures', symbol : '1077028'}, {name : 'KB KSTAR Exporter Equity', symbol : '953384'}, {name : 'KB KBSTAR KQ High Dividend', symbol : '1031346'}, {name : 'KB KBSTAR Holding Company', symbol : '1056174'}, {name : 'KB KBSTAR 200 Information Technology', symbol : '1056437'}, {name : 'KB KBSTAR 200 Consumer Staples', symbol : '1057215'}, {name : 'KB KBStar Game Industry', symbol : '1089768'}, {name : 'KB KBSTAR 200 Industrials', symbol : '1057213'}, {name : 'KB KBSTAR KTB 3Y Futures Inverse', symbol : '1055118'}, {name : 'KB KBSTAR KTB 10Y Futures Inverse', symbol : '1077031'}, {name : 'KB KSTAR Equity Balanced Equity-Derivatives ', symbol : '953383'}, {name : 'KB KBStar KOSPI', symbol : '1089767'}, {name : 'KB KBSTAR KQ Momentum Value', symbol : '1089538'}, {name : 'KB KBSTAR Mid-Small Cap Momentum LowVol', symbol : '1089537'}, {name : 'KB KBSTAR Mid-Small Cap Momentum Value', symbol : '1089536'}, {name : 'KB KBSTAR KQ Momentum LowVol', symbol : '1089535'}, {name : 'KB KBSTAR ESG SRI', symbol : '1072257'}, {name : 'KB KBSTAR 200 Financials', symbol : '1056435'}, {name : 'KB KBSTAR 200 Consumer Discretionary', symbol : '1057216'}, {name : 'KB KBSTAR China H Futures Inverse', symbol : '1073352'}, {name : 'KB KSTAR Japan Leverage (H)', symbol : '953386'}, {name : 'KB KSTAR Synth-US Oil Gas EP Compa', symbol : '956468'}, {name : 'KB KBSTAR China H-Share Hedged', symbol : '997384'}, {name : 'KB KBSTAR US Treasury Long Bond Futures', symbol : '1014032'}, {name : 'KB KBSTAR US Treasury Long Bond Futures Inverse', symbol : '1014033'}, {name : 'KB KBSTAR US Treasury Long Bond Futures Leverage S', symbol : '1014034'}, {name : 'KB KBSTAR US Treasury Long Bond Futures Inverse 2X', symbol : '1014035'}, {name : 'KB KSTAR China Mainland CSI100 Feeder', symbol : '953381'}];
const kospi100_kosdaq100_arr = [{name : '삼성전자', symbol : '43433'}, {name : '미래에셋대우', symbol : '43441'}, {name : 'SK하이닉스', symbol : '43430'}, {name : '삼성중공업', symbol : '43366'}, {name : '기아차', symbol : '43460'}, {name : 'LG디스플레이', symbol : '43463'}, {name : 'Woori Financial', symbol : '1131302'}, {name : 'NH투자증권', symbol : '43545'}, {name : '하나금융지주', symbol : '43378'}, {name : '쌍용양회', symbol : '43392'}, {name : '한화생명', symbol : '43446'}, {name : '한국전력', symbol : '43525'}, {name : '대한항공', symbol : '43514'}, {name : '대우 건설', symbol : '43536'}, {name : 'KB금융', symbol : '43413'}, {name : '신한지주', symbol : '43453'}, {name : '현대건설', symbol : '43371'}, {name : 'LG유플러스', symbol : '43492'}, {name : '삼성증권', symbol : '43407'}, {name : '기업은행', symbol : '43542'}, {name : 'BNK 금융그룹', symbol : '43414'}, {name : 'KT', symbol : '43507'}, {name : '한화케미칼', symbol : '43457'}, {name : '삼성전기', symbol : '43350'}, {name : '셀트리온', symbol : '979618'}, {name : 'LG Electronics', symbol : '43348'}, {name : '삼성엔지니어링', symbol : '43435'}, {name : '호텔신라', symbol : '43780'}, {name : '카카오', symbol : '979247'}, {name : '한온시스템', symbol : '43346'}, {name : '현대차', symbol : '43399'}, {name : '한국항공우주', symbol : '43962'}, {name : '현대제철', symbol : '43400'}, {name : '넷마블', symbol : '1010663'}, {name : '네이버 주식회사', symbol : '43493'}, {name : '한국투자금융지주', symbol : '43540'}, {name : '휠라코리아', symbol : '44004'}, {name : 'GS건설', symbol : '43522'}, {name : '삼성SDI', symbol : '43450'}, {name : '현대해상', symbol : '43590'}, {name : '한전KPS', symbol : '43964'}, {name : '대우조선해양', symbol : '43436'}, {name : '현대모비스', symbol : '43398'}, {name : 'S-oil', symbol : '43473'}, {name : '삼성물산', symbol : '43477'}, {name : '금호석유', symbol : '43347'}, {name : '한국타이어', symbol : '44101'}, {name : '강원랜드', symbol : '43422'}, {name : '두산밥캣', symbol : '993306'}, {name : '포스코 대우', symbol : '43535'}, {name : '코웨이', symbol : '43524'}, {name : 'KT&G', symbol : '43480'}, {name : '제일기획', symbol : '43352'}, {name : '포스코', symbol : '43531'}, {name : '한화', symbol : '43517'}, {name : '아모레퍼시픽', symbol : '43416'}, {name : 'SK이노베이션', symbol : '43404'}, {name : '한국가스공사', symbol : '43527'}, {name : 'Lotte', symbol : '43454'}, {name : '삼성생명', symbol : '43428'}, {name : 'GS 그룹', symbol : '43497'}, {name : 'LG이노텍', symbol : '43465'}, {name : '동부화재', symbol : '43455'}, {name : '현대중공업', symbol : '43541'}, {name : 'LG화학', symbol : '43424'}, {name : 'LG', symbol : '43508'}, {name : 'SK Telecom', symbol : '43472'}, {name : '대림산업', symbol : '43456'}, {name : '한샘', symbol : '43791'}, {name : 'OCI', symbol : '43469'}, {name : '삼성바이오로직스', symbol : '993256'}, {name : '오리온', symbol : '1031094'}, {name : 'SK그룹', symbol : '43520'}, {name : '삼성카드', symbol : '43427'}, {name : 'GS리테일', symbol : '43751'}, {name : '아모레G', symbol : '43443'}, {name : '롯데케미칼', symbol : '43374'}, {name : '엔씨소프트', symbol : '43448'}, {name : '이마트', symbol : '44089'}, {name : '삼성화재해상보험', symbol : '43370'}, {name : '두산', symbol : '43516'}, {name : '현대백화점', symbol : '43372'}, {name : '삼성에스디에스', symbol : '948394'}, {name : '신세계', symbol : '43484'}, {name : 'CJ 그룹', symbol : '43499'}, {name : 'Hyundai Robotics', symbol : '1010641'}, {name : '에스원', symbol : '43495'}, {name : '유한양행', symbol : '43532'}, {name : '한미사이언스', symbol : '43783'}, {name : '롯데쇼핑', symbol : '43383'}, {name : '현대글로비스', symbol : '43379'}, {name : 'LG생활건강', symbol : '43521'}, {name : '고려아연', symbol : '43381'}, {name : 'CJ대한통운', symbol : '43377'}, {name : 'CJ제일제당', symbol : '43376'}, {name : 'BGF', symbol : '1057402'}, {name : 'KCC', symbol : '43537'}, {name : '한미약품', symbol : '43440'}, {name : '농심', symbol : '43494'}, {name : '오뚜기', symbol : '43518'}, {name : '지스마트글로벌', symbol : '979873'}, {name : '아난티', symbol : '979168'}, {name : '제이콘텐트리', symbol : '979262'}, {name : '넥슨지티', symbol : '979332'}, {name : 'APS홀딩스', symbol : '979493'}, {name : '이베스트투자증권', symbol : '979660'}, {name : '에스에프에이', symbol : '979505'}, {name : '서울반도체', symbol : '979393'}, {name : 'NICE평가정보', symbol : '979186'}, {name : 'Posco Chemical', symbol : '979031'}, {name : '파트론', symbol : '979766'}, {name : '와이지엔터테인먼트', symbol : '979909'}, {name : '에스엠', symbol : '979336'}, {name : 'NHN한국사이버결제', symbol : '979532'}, {name : '크루셜텍', symbol : '979871'}, {name : '셀트리온', symbol : '979618'}, {name : 'Tongyang Cement & Energy', symbol : '979298'}, {name : '카카오', symbol : '979247'}, {name : 'KG이니시스', symbol : '979244'}, {name : '에이치엘비', symbol : '979183'}, {name : '차바이오텍', symbol : '979716'}, {name : '인바디', symbol : '979339'}, {name : '루트로닉', symbol : '979715'}, {name : '파라다이스', symbol : '979234'}, {name : '디오', symbol : '979322'}, {name : '코나아이', symbol : '979452'}, {name : '서부T&D', symbol : '979042'}, {name : '주성엔지니어링', symbol : '979274'}, {name : '포스코 ICT', symbol : '979134'}, {name : 'CJ ENM', symbol : '979248'}, {name : '실리콘웍스', symbol : '979860'}, {name : '휴맥스', symbol : '979886'}, {name : '코오롱생명과학', symbol : '979844'}, {name : '내츄럴엔도텍', symbol : '979997'}, {name : '성우하이텍', symbol : '979096'}, {name : '톱텍', symbol : '979859'}, {name : '이오테크닉스', symbol : '979307'}, {name : '인터파크홀딩스', symbol : '979239'}, {name : '젬백스', symbol : '979696'}, {name : '코미팜', symbol : '979343'}, {name : '원익홀딩스', symbol : '979190'}, {name : '인트론바이오', symbol : '979406'}, {name : '제넥신', symbol : '979797'}, {name : '연우', symbol : '979895'}, {name : '다원시스', symbol : '979617'}, {name : '쇼박스', symbol : '979731'}, {name : '위메이드', symbol : '979869'}, {name : '코데즈컴바인', symbol : '979020'}, {name : '인터로조', symbol : '979880'}, {name : '웹젠', symbol : '979624'}, {name : '씨젠', symbol : '979800'}, {name : '모두투어', symbol : '979685'}, {name : '원익머트리얼즈', symbol : '979851'}, {name : '더블유게임즈', symbol : '980024'}, {name : '바디텍메드', symbol : '980046'}, {name : '바이넥스', symbol : '979462'}, {name : '코리아나', symbol : '979176'}, {name : '에이티젠', symbol : '980010'}, {name : '한글과컴퓨터', symbol : '979189'}, {name : '녹십자셀', symbol : '979194'}, {name : '파마리서치프로덕트', symbol : '980078'}, {name : 'CJ프레시웨이', symbol : '979441'}, {name : '아미코젠', symbol : '979768'}, {name : '안랩', symbol : '979479'}, {name : '컴투스', symbol : '979666'}, {name : '바이로메드', symbol : '979714'}, {name : '오스템임플란트', symbol : '979402'}, {name : '대화제약', symbol : '979599'}, {name : '메디포스트', symbol : '979665'}, {name : '인터파크홀딩스', symbol : '979862'}, {name : '바텍', symbol : '979355'}, {name : '메디톡스', symbol : '979729'}, {name : '고영', symbol : '979813'}, {name : '한국정보통신', symbol : '979163'}, {name : '나스미디어', symbol : '979747'}, {name : '솔브레인', symbol : '979273'}, {name : '리더스코스메틱', symbol : '979097'}, {name : 'SK머티리얼즈', symbol : '979264'}, {name : 'SK바이오랜드', symbol : '979447'}, {name : '골프존', symbol : '980080'}, {name : '동화기업', symbol : '979166'}, {name : '쎌바이오텍', symbol : '979425'}, {name : '게임빌', symbol : '979550'}, {name : '선데이토즈', symbol : '979916'}, {name : '아이센스', symbol : '979815'}, {name : '콜마비앤에이치', symbol : '980038'}, {name : '다우데이타', symbol : '979200'}, {name : '휴온스', symbol : '989512'}, {name : '동국제약', symbol : '979724'}, {name : '뷰웍스', symbol : '979825'}, {name : '리노공업', symbol : '979520'}, {name : '휴메딕스', symbol : '980048'}, {name : 'GS홈쇼핑', symbol : '979182'}, {name : '매일유업', symbol : '979041'}, {name : '케어젠', symbol : '980074'}];

const isProd = process.env.PORT ? true : false;

let webString = "데이터 준비중입니다.";
let date = new Date();

const getIssueObject = async (name, symbol, from_time) => {
    return new Promise(async (resolve, reject) => {
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
    });
}

const main = async (stocks_arr) => {
    let issue_obj_arr = [];

    for(let i = 0; i < stocks_arr.length; i++) {
        issue_obj_arr.push(await getIssueObject(stocks_arr[i].name, stocks_arr[i].symbol, '1245660137'));
    }

    issue_obj_arr.sort((a, b) => {
        return a.difference_rate - b.difference_rate;
    })

    webString = '';

    for(let i = 0; i < issue_obj_arr.length; i++) {
        let issue_obj = issue_obj_arr[i];        
        if(isProd){
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
    if( isProd ){
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
//http.get(process.env.PORT ? "https://like-bnf.herokuapp.com":"http://localhost:3000");
setInterval(function () {
    console.log("setInterval.");
    http.get(process.env.PORT ? "https://like-bnf.herokuapp.com":"http://localhost:3000");
}, 600000); // every 10 minutes
 
main(kospi100_kosdaq100_arr);