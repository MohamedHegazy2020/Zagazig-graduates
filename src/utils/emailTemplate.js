export const emailTemplate = ({ link, linkData, subject, otp }) => {
  return `<!DOCTYPE html>
  <html>
  <head>
  <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
      crossorigin="anonymous"
    />
     </head>
  
      
      
      <body style="margin:0px;">
        <table border="0" width="50%" style="margin:auto;padding:30px;background-color: #F3F3F3;border:1px solid #0e01a5;">
        <tr>
        <td>
        <table border="0" width="100%">
        <tr>
        <td>
        <h1 style="color:#0e01a5;text-transform: capitalize;" >
            zagazig university  
        </h1>
        
        </td>
        
        </tr>
        </table>
        </td>
        </tr>
        <tr>
        <td>
        <table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color: #fff;">
        <tr>
        <td style="background-color:#0e01a5;height:100px;font-size:50px;color:#fff;">
        <h5 style="color:#fff;text-transform: capitalize;">faculty of computers and informatics</h5>
        </td>
        </tr>
        <tr>
        <td>
        <h1 style="padding-top:25px; color:#0e01a5">${subject}</h1>
        </td>
        </tr>
        <tr>
        <td>
        <p style="padding:0px 100px;">
        </p>
        </td>
        </tr>
        <tr>
        <td>
        ${link&&linkData?`<a href="${link}" style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#0e01a5; ">${linkData}</a>`:``}
        ${otp?`<h3>OTP Code is <span style="color:#0e01a5 ; font-weight:bolder; margin-left:3px" >${otp}</span></h3>`:``}
        
        </td>
      
        </tr>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <tr>
        </tr>
        </table>
        </td>
        </tr>
        <tr>
        <td>
        <table border="0" width="100%" style="border-radius: 5px;text-align: center;">
        <tr>
        <td>
        <h3 style="margin-top:10px; color:#000">Stay in touch</h3>
        </td>
        </tr>
        
        </table>
        </td>
        </tr>
        </table>
       
      
    </body>
  </html>`;
};
