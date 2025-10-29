"use client";

export default function TrustedForm() {
    return (
        <>
            <div style={{ display: "none" }} aria-hidden="true">
                <input type="hidden" name="xxTrustedFormCertUrl" value="" />
                <input type="hidden" name="xxTrustedFormPingUrl" value="" />
            </div>
            <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                    __html: `
  (function() {
    var tf = document.createElement('script');
    tf.type = 'text/javascript';
    tf.async = true;
    tf.src = ("https:" == document.location.protocol ? 'https' : 'http') +
      '://api.trustedform.com/trustedform.js?field=xxTrustedFormCertUrl&use_tagged_consent=true&l=' +
      (new Date().getTime() + Math.random());
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(tf, s);
  })();
                `.trim()
                }}
            />
            <noscript>
                <img src="https://api.trustedform.com/ns.gif" alt="" />
            </noscript>
        </>
    );
}