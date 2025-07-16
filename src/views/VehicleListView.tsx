import { Container, Typography } from "@mui/material"
import type React from "react"
import VehicleListPage from "../pages/VehicleListPage"

const VehicleListView: React.FC = () => {
  return (
      <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Lista de Vehículos
      </Typography>
      <VehicleListPage />
    </Container>
  )
}

export default VehicleListView