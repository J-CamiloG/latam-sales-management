
## Componentes Principales

### Dashboard

El componente principal que contiene toda la lógica y la interfaz de usuario para el dashboard de ventas.

Funcionalidades:
- Carga de datos de clientes, sucursales y productos desde una API
- Selección de cliente y sucursal
- Adición y eliminación de productos en la venta
- Cálculo de subtotales y total
- Creación de nuevos clientes

## Cómo Ejecutar el Proyecto

1. Clona el repositorio:
   ```bash
   git clone https://github.com/J-CamiloG/latam-sales-management.git
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd latam-sales-management
   ```

3. Instala las dependencias:
   ```bash
   npm install
   ```

4. Ejecuta el json server para simular la base de datos:
   ```bash
   npm run dev npx json-server --watch data/db.json --port 3000
   ```
4. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. Abre tu navegador y visita en el localhost que te haya proporcionado el paso anterior 

5. Credenciales para login : 
     correo : admin@example.com
     contraseña : password123

## API y Endpoints

El dashboard consume datos de los siguientes endpoints:

- \`http://localhost:3000/clients\`: Para obtener la lista de clientes
- \`http://localhost:3000/branch_offices\`: Para obtener la lista de sucursales
- \`http://localhost:3000/products\`: Para obtener la lista de productos

Asegúrate de que estos endpoints estén disponibles y devuelvan los datos en el formato esperado.

## Personalización

El dashboard utiliza Tailwind CSS para los estilos, lo que facilita la personalización del aspecto visual. Puedes modificar los colores, espaciados y otros estilos editando las clases de Tailwind en el componente Dashboard.

## Mejoras Futuras

- Implementar la funcionalidad de guardar ventas en el backend
- Agregar una vista de historial de ventas
- Implementar autenticación de usuarios
- Agregar más análisis y gráficos de ventas