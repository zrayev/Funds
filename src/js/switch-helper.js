$(document).ready(function () {
  var depositLink = $('p.deposit a');
  var withdrawLink = $('p.withdraw a');
  var depositDetailsBlock = $('div.block--deposit-container');
  var withdrawDetailsBlock = $('div.block--withdraw-container');
  var currencyActiveItems = $('div.block--currencies-items table');

  $('div.block--currencies-items table:first-child').addClass('selected');
  $('div.block--currencies-items table:first-child').css('border-right', '0');

  depositLink.click(function () {
    var currencyItem = $(this.closest("table"));

    depositLink.removeClass('active-action');
    this.setAttribute('class','active-action');
    currencyActiveItems.removeClass('selected');
    currencyActiveItems.css('border-right', '1px solid #cccccc');
    currencyItem.addClass('selected');
    currencyItem.css('border-right', '0');
    switchToDeposit();
  });

  withdrawLink.click(function () {
    var currencyItem = $(this.closest("table"));

    withdrawLink.removeClass('active-action');
    this.setAttribute('class','active-action');
    currencyActiveItems.removeClass('selected');
    currencyActiveItems.css('border-right', '1px solid #cccccc');
    currencyItem.addClass('selected');
    currencyItem.css('border-right', '0');
    switchToWithdraw();
  });

  function switchToDeposit() {
    depositDetailsBlock.css('display', 'block');
    withdrawDetailsBlock.css('display', 'none');
    withdrawLink.removeClass('active-action');
  }

  function switchToWithdraw() {
    depositDetailsBlock.css('display', 'none');
    withdrawDetailsBlock.css('display', 'block');
    depositLink.removeClass('active-action');
  }
});
