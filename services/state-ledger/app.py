from flask import Flask, request, jsonify; from flask_cors import CORS; import time
app=Flask(__name__); CORS(app)
DB={"accounts":{"0xUserA":{"fex":1000.0,"su":50,"staked":100.0,"last_update":time.time(),"skill_tree":{"awareness":3,"compassion":2}}}}
@app.route('/')
def health(): return jsonify({"status":"online - State Ledger"})
@app.route('/account/<accountId>')
def get_account(accountId): return jsonify(DB["accounts"].get(accountId,{}))
@app.route('/transaction',methods=['POST'])
def trx():
    tx=request.get_json();acc_id=tx['accountId']
    if acc_id not in DB['accounts']: DB['accounts'][acc_id]={\"fex\":0,\"su\":0,\"staked\":0,\"skill_tree\":{}}
    if tx['type']=='PoccReward':
        DB['accounts'][acc_id]['fex']+=tx['fex_reward']; DB['accounts'][acc_id]['su']+=tx['su_reward']
        skill = tx.get('skill', 'awareness')
        DB['accounts'][acc_id]['skill_tree'][skill] = DB['accounts'][acc_id]['skill_tree'].get(skill, 0) + 1
    return jsonify(DB['accounts'][acc_id])
if __name__=='__main__': app.run(host='0.0.0.0',port=10000)
