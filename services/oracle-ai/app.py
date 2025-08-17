from flask import Flask,request,jsonify;from flask_cors import CORS;import requests,os,nltk
app=Flask(__name__);CORS(app)
try:nltk.data.find('sentiment/vader_lexicon.zip')
except:nltk.download('vader_lexicon',quiet=True)
from nltk.sentiment.vader import SentimentIntensityAnalyzer
analyzer=SentimentIntensityAnalyzer()
STATE_LEDGER_URL=os.environ.get('STATE_LEDGER_URL')
AETHER_WEAVER_URL=os.environ.get('AETHER_WEAVER_URL')
def get_guidance(text):
    if any(w in text.lower() for w in ["love","grateful"]): return "High coherence insight detected. The network resonates with this."
    return "Insight anchored. What is the feeling behind this thought?"
@app.route('/pocc/analyze',methods=['POST'])
def analyze():
    data=request.get_json();text=data.get('text','');acc=data.get('accountId');skill="awareness"
    if "learn" in text.lower(): skill="knowledge"
    if "art" in text.lower() or "beauty" in text.lower(): skill="creativity"
    sentiment=analyzer.polarity_scores(text)['compound']
    fex=max(1.,len(text)/10.)*(1+sentiment);su=max(1,int(len(text)/20.))*(1+sentiment)
    try:
        requests.post(f"{STATE_LEDGER_URL}/transaction",json={"type":"PoccReward","accountId":acc,"fex_reward":fex,"su_reward":su,"skill":skill})
        requests.post(f"{AETHER_WEAVER_URL}/tune",json={"accountId":acc,"event":"pocc_success"})
    except: return jsonify({"error":"backend service unavailable"}),500
    return jsonify({"guidance":get_guidance(text)})
@app.route('/')
def health(): return jsonify({"status":"online - Oracle AI"})
if __name__=='__main__': app.run(host='0.0.0.0',port=10000)
