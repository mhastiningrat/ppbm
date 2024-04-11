<style>
    [class*="sidebar-dark-"] {
        background-color: #fdfdfd !important;
    }
    .user-panel img {
        width: 5.1rem !important;
    }
    [class*="sidebar-dark-"] .nav-treeview > .nav-item > .nav-link {
        color: #4f5962 !important;
    }
</style>
<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    {{-- <a href="index3.html" class="brand-link">
      <img src="{{ asset('img/Logo PPBM.png') }}" alt="ppbm" class="brand-image" style="opacity: .8">
      <span class="brand-text font-weight-light"></span>
    </a> --}}

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="{{ asset('img/Logo PPBM.png') }}" class="brand-image" alt="User Image">
        </div>
        {{-- <div class="info">
          <a href="#" class="d-block">Alexander Pierce</a>
        </div> --}}
      </div>

      <!-- SidebarSearch Form -->

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item menu-open">
            {{-- <a href="#" class="nav-link active">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
                <i class="right fas fa-angle-left"></i>
              </p>
            </a> --}}
          <ul class="nav nav-treeview">
            <li class="nav-item">
                  <a href="absen" class="nav-link">
                    <i class="fas fa-check nav-icon"></i>
                    <p>Absen</p>
                  </a>
                </li>
          </ul>
          <ul class="nav nav-treeview">
            <li class="nav-item">
                  <a href="slipgaji" class="nav-link">
                    <i class="fas fa-file-invoice-dollar nav-icon"></i>
                    <p>Slip Gaji</p>
                  </a>
                </li>
          </ul>
          <ul class="nav nav-treeview">
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-copy"></i>
                <p>
                  Cleaning Service
                  <i class="fas fa-angle-left right"></i>
                  {{-- <span class="badge badge-info right">6</span> --}}
                </p>
              </a>
              <ul class="nav nav-treeview">
                
                <li class="nav-item">
                  <a href="#" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>TAD</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="cleaning_service_report" class="nav-link">
                    {{-- <i class="fa-solid fa-cloud-arrow-up nav-icon"></i> --}}
                    <i class="fas fa-upload nav-icon"></i>
                    <p>Aktifitas Harian</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="cleaning_service_report_harian" class="nav-link">
                    {{-- <i class="fa-solid fa-cloud-arrow-up nav-icon"></i> --}}
                    <i class="fas fa-file nav-icon"></i>
                    <p>Report</p>
                  </a>
                </li>
                
              </ul>
            </li>
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="nav-icon fas fa-chart-pie"></i>
                <p>
                  Security
                  <i class="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <a href="#" class="nav-link">
                    <i class="far fa-circle nav-icon"></i>
                    <p>TAD</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link">
                    {{-- <i class="fa-solid fa-cloud-arrow-up nav-icon"></i> --}}
                    <i class="fas fa-upload nav-icon"></i>
                    <p>Aktifitas Harian</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" class="nav-link">
                    <i class="fas fa-upload nav-icon"></i>
                    <p>Report</p>
                  </a>
                </li>
                
              </ul>
            </li>
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>