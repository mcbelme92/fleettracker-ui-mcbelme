import { Box, Container, Typography } from "@mui/material"
import type React from "react"
import VehicleListPage from "../pages/VehicleListPage"


export const VehicleListView: React.FC = () => {
  return (
<Container maxWidth="lg" sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom>
        Lista de Vehículos
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
      <VehicleListPage />
       </Box>
    </Container>
  )
}

export default VehicleListView