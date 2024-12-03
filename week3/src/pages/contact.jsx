import React from 'react'


function contact() {
  return (
    <div>
   
      <div class="contact">
        
        <div class="contactimg">
            <img src="https://cdn.pixabay.com/photo/2023/06/01/07/59/call-8033050_1280.png" alt="" width="300px"/>
        </div>
        <div class="contactus">
            <h1>Contact US</h1>
                
            
                <form action="">
                    <label for="name" class="field">Name</label>
                    <input type="text" id="name" placeholder="Enter Your Name"/><br/><br/>
                    <label for="email" class="field">Email</label>
                    <input type="email" id="email" placeholder="Your Email Address"/><br/><br/>
                    <label for="number" class="field">Number</label>
                    <input type="number"  id="number"placeholder="Your Phone Number"/><br/><br/>
                    <label for="city" class="field">Message</label>
                    <textarea name="" id=""></textarea><br/><br/>
                    <label for="Signup" class="field"></label>
                    <input type="submit" name="Signup" id="Signup"/>
                </form>
        
        </div>
      </div>

    </div>
  )
}

export default contact
