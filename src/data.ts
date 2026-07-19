export interface SaldoCuenta {
  cuentaId: string;
  obligatoria: number;
  voluntaria: number;
  cesantias: number;
  moneda: string;
  actualizadoEn: string;
}

export interface Transaccion {
  id: string;
  fecha: string;
  descripcion: string;
  tipo: 'aporte' | 'retiro' | 'rendimiento';
  monto: number;
}

const saldosPorCuenta: Record<string, SaldoCuenta> = {
  '1001': {
    cuentaId: '1001',
    obligatoria: 15230000,
    voluntaria: 4200000,
    cesantias: 3100000,
    moneda: 'COP',
    actualizadoEn: '2026-07-18T10:00:00.000Z',
  },
  '1002': {
    cuentaId: '1002',
    obligatoria: 8750000,
    voluntaria: 0,
    cesantias: 1950000,
    moneda: 'COP',
    actualizadoEn: '2026-07-18T10:00:00.000Z',
  },
};

const saldoPorDefecto = (cuentaId: string): SaldoCuenta => ({
  cuentaId,
  obligatoria: 10000000,
  voluntaria: 2000000,
  cesantias: 1500000,
  moneda: 'COP',
  actualizadoEn: '2026-07-18T10:00:00.000Z',
});

const tiposTransaccion: Transaccion['tipo'][] = ['aporte', 'retiro', 'rendimiento'];

function generarTransacciones(cuentaId: string): Transaccion[] {
  return Array.from({ length: 10 }, (_, i) => {
    const tipo = tiposTransaccion[i % tiposTransaccion.length];
    const dia = (i + 1).toString().padStart(2, '0');
    return {
      id: `${cuentaId}-txn-${i + 1}`,
      fecha: `2026-07-${dia}T09:00:00.000Z`,
      descripcion:
        tipo === 'aporte'
          ? 'Aporte mensual empleador'
          : tipo === 'retiro'
            ? 'Retiro parcial voluntario'
            : 'Rendimiento del periodo',
      tipo,
      monto: tipo === 'retiro' ? -1 * (50000 + i * 1000) : 100000 + i * 5000,
    };
  });
}

export function obtenerSaldo(cuentaId: string): SaldoCuenta {
  return saldosPorCuenta[cuentaId] ?? saldoPorDefecto(cuentaId);
}

export function obtenerTransacciones(cuentaId: string): Transaccion[] {
  return generarTransacciones(cuentaId);
}
