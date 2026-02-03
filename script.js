function hitung() {

  // ===== INPUT =====
  let b1 = parseFloat(document.getElementById("b1").value);
  let b2 = parseFloat(document.getElementById("b2").value);
  let b3 = parseFloat(document.getElementById("b3").value);
  let b4 = parseFloat(document.getElementById("b4").value);
  let b5 = parseFloat(document.getElementById("b5").value);
  let cosphi = parseFloat(document.getElementById("cosphi").value) || 1;

  let CTp = parseFloat(document.getElementById("CTp").value);
  let CTs = parseFloat(document.getElementById("CTs").value);
  let PTp = parseFloat(document.getElementById("PTp").value);
  let PTs = parseFloat(document.getElementById("PTs").value);

  let VR = parseFloat(document.getElementById("VR").value);
  let VS = parseFloat(document.getElementById("VS").value);
  let VT = parseFloat(document.getElementById("VT").value);

  let IR = parseFloat(document.getElementById("IR").value);
  let IS = parseFloat(document.getElementById("IS").value);
  let IT = parseFloat(document.getElementById("IT").value);

  let IRs = parseFloat(document.getElementById("IRs").value) || 0;
  let ISs = parseFloat(document.getElementById("ISs").value) || 0;
  let ITs = parseFloat(document.getElementById("ITs").value) || 0;


  // ===== PROSES =====
  let beban = [b1, b2, b3, b4, b5];
  let bebanValid = beban.filter(x => !isNaN(x) && x !== 0);
  let total = bebanValid.reduce((a, b) => a + b, 0);
  let avg = bebanValid.length > 0 ? total / bebanValid.length : 0;
  let faktor = (CTp / CTs) * (PTp / PTs);
  let kwhP1 = avg * faktor;

  let rasioCT = CTp / CTs;
  let rasioPT = PTp / PTs;
  let sqrt3 = 1.732;

  let Vp_R = VR * rasioPT * sqrt3;
  let Vp_S = VS * rasioPT * sqrt3;
  let Vp_T = VT * rasioPT * sqrt3;
  let Vsec_avg = (VR + VS + VT) / 3;
  let Vpri_avg = Vsec_avg * rasioPT * sqrt3;
  let Ipri_avg = (IR + IS + IT) / 3;
  let kwhP2 = (Vpri_avg * Ipri_avg * cosphi * sqrt3) / 1000;

  let errorCT_R = 0, errorCT_S = 0, errorCT_T = 0;

if (IRs > 0) {
  errorCT_R = ((IR / (IRs * rasioCT)) - 1) * 100;
}
if (ISs > 0) {
  errorCT_S = ((IS / (ISs * rasioCT)) - 1) * 100;
}
if (ITs > 0) {
  errorCT_T = ((IT / (ITs * rasioCT)) - 1) * 100;
}

  let deviasiCT = 0;
if (kwhP2 > 0) {
  deviasiCT = ((kwhP1 / kwhP2) - 1) * 100;
}

  // ===== OUTPUT =====
  document.getElementById("avg").innerText = avg.toFixed(4) + " kWh";
  document.getElementById("faktor").innerText = faktor.toFixed(0);
  document.getElementById("kwhP1").innerText = kwhP1.toFixed(2) + " kWh";

  document.getElementById("Vprimer").innerHTML = `
  R : ${Vp_R.toFixed(0)} V<br>
  S : ${Vp_S.toFixed(0)} V<br>
  T : ${Vp_T.toFixed(0)} V<br>

  Rata2 Tegangan Sekunder : ${Vsec_avg.toFixed(2)} V<br>
  Rata2 Tegangan Primer : ${Vpri_avg.toFixed(0)} V<br>
  Rata2 Arus Primer : ${Ipri_avg.toFixed(2)} A<br>
  kWh P2 : ${kwhP2.toFixed(2)} kWh
`;

  document.getElementById("errorCT").innerHTML = `
  R : ${errorCT_R.toFixed(2)} %<br>
  S : ${errorCT_S.toFixed(2)} %<br>
  T : ${errorCT_T.toFixed(2)} %
`;
 document.getElementById("deviasiCT").innerText = deviasiCT.toFixed(2) + "%";
}
function resetForm() {
  // Reset semua input dulu
  const inputs = document.querySelectorAll("input");

  inputs.forEach(input => {
    input.value = "";
  });

  // Kembalikan nilai default (tidak ikut terhapus)
  document.getElementById("CTs").value = 5;
  document.getElementById("PTp").value = 20000;
  document.getElementById("PTs").value = 100;

  // Hapus semua output
  document.getElementById("avg").innerText = "";
  document.getElementById("faktor").innerText = "";
  document.getElementById("kwhP1").innerText = "";
  document.getElementById("kwhP2").innerText = "";
  document.getElementById("Vprimer").innerText = "";
  document.getElementById("errorCT").innerText = "";
}


