(function() {
  var form = document.getElementById('demo-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var name = form.querySelector('#name').value.trim();
    var email = form.querySelector('#email').value.trim();
    var researchNeeds = form.querySelector('#research-needs').value.trim();

    // Fire Segment event
    if (window.analytics) {
      analytics.track('Lead Submitted', {
        name: name,
        email: email,
        research_needs: researchNeeds
      });
    }

    // Build Calendly URL with prefilled name + email
    var calendlyUrl = 'https://calendly.com/useconvo/book';
    var params = [];
    if (name) params.push('name=' + encodeURIComponent(name));
    if (email) params.push('email=' + encodeURIComponent(email));
    if (params.length) calendlyUrl += '?' + params.join('&');

    // Show success state
    form.style.display = 'none';
    var done = document.getElementById('demo-success');
    if (done) {
      // Update fallback link with prefilled URL
      var fallbackLink = done.querySelector('a');
      if (fallbackLink) fallbackLink.href = calendlyUrl;
      done.style.display = 'block';
    }

    // Open Calendly in new tab, handle popup blockers
    var newWindow = window.open(calendlyUrl, '_blank');
    if (!newWindow && done) {
      var fallbackMsg = done.querySelector('.demo-popup-blocked');
      if (fallbackMsg) fallbackMsg.style.display = 'block';
    }
  });
})();
