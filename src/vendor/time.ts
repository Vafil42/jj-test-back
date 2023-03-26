export default function TimeDay() {
  const day = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString().slice(0, -3);
  return day + ' ' + time;
}
