// logsServer.js
export const logsServer = (req, res, next) => {
  const startHrTime = process.hrtime();

  res.on('finish', () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = (elapsedHrTime[0] * 1e9 + elapsedHrTime[1]) / 1e6;
    
    // Obtiene la fecha y hora local del sistema
    const now = new Date();
    // Formatea la fecha y hora de manera más simple
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString();

    const method = req.method;
    const url = req.originalUrl;
    const ip = req.ip;

    // Se usa la fecha y hora local en el log
    console.log(`[${date} ${time}] - Método: ${method} | URL: ${url} | IP: ${ip} | Tiempo Respuesta: ${elapsedTimeInMs.toFixed(3)} ms`);
  });

  next();
};