from flask import Flask, render_template, request, redirect, url_for, send_from_directory
from hoyo import getJSON, main;
import asyncio

app = Flask(__name__)

@app.route('/')
def index():
    # return render_template('load.html')
    return render_template('profile.html')

@app.route('/create_file', methods=['POST'])
def create_file():
    if request.method == 'POST':
        print(request.form)
        a = asyncio.run(main(request.form['uid']))
        # print(a)
        return (str(a))
    
    
    
    
    
    
    
@app.route('/load_uid_py', methods=['GET', 'POST'])
def load_uid_py():
    if request.method == 'POST':
        print("a")
        return render_template('load_uid.html')

    # show the form, it wasn't submitted
    return render_template('load_uid.html')

@app.route('/profile_py', methods=['GET', 'POST'])
def profile_py():
    if request.method == 'POST':
        print("a")
        return render_template('profile.html')

    # show the form, it wasn't submitted
    return render_template('profile.html')

@app.route('/relic_ranking_py', methods=['GET', 'POST'])
def relic_ranking_py():
    if request.method == 'POST':
        print("a")
        return render_template('relic_ranking.html')

    # show the form, it wasn't submitted
    return render_template('relic_ranking.html')




if __name__ == '__main__':
    app.run(
        host='127.0.0.1',
        port=5001,
        debug=True
    )