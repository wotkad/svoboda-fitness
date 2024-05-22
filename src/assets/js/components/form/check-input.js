export default function checkInput() {
  $('input[type="tel"], input[name="code"]').on('keydown', function(e) {
    if (e.key !== undefined) {
      if(e.key.length == 1 && e.key.match(/[^0-9'".]/)){
        return false;
      }
    }
  });
}
checkInput();